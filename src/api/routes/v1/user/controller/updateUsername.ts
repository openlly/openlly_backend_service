import { Request, Response } from 'express';
import apiResponseHandler from '../../../../../utils/apiResponseHandler';
import { updateUserSchema } from '../schema/schema';
import { prisma } from '../../../../../prisma/prisma';
import { userResponseHandler } from '../../../../../utils/user/userResponseHelper';
import { updateUserInRedis } from '../../../../../redis/user/redisUserHelper';

export default async function updateUsername(req: Request, res: Response) {
  // Validate request body against schema
  const schema = await updateUserSchema.safeParseAsync(req.body);
  if (!schema.success) {
    return apiResponseHandler(res, {
      statusCode: 400,
      hasError: true,
      message: 'Invalid request body',
    });
  }

  // Normalize username (lowercase first character)
  const username = schema.data.username
    ? schema.data.username.charAt(0).toLowerCase() + schema.data.username.slice(1)
    : '';
  if (!username) {
    return apiResponseHandler(res, {
      statusCode: 400,
      hasError: true,
      message: 'Invalid username',
    });
  }

  // Fetch existing user with the username (case-insensitive)
  const existingUser = await prisma.user.findFirst({
    where: { username: { equals: username, mode: 'insensitive' } },
  });

  const loggedInUserId = req.userId;
  if (existingUser) {
    // Check if the logged-in user already has this username
    if (loggedInUserId === existingUser.id) {
      return apiResponseHandler(res, {
        statusCode: 400,
        hasError: true,
        message: 'You already have this username',
      });
    }

    // If username exists and belongs to another user, reject the request
    return apiResponseHandler(res, {
      statusCode: 409,
      hasError: true,
      message: 'Username already taken by another user',
    });
  }

  // Fetch the logged-in user to update
  const userToUpdate = await prisma.user.findUnique({
    where: { id: loggedInUserId },
  });

  if (!userToUpdate) {
    return apiResponseHandler(res, {
      statusCode: 404,
      hasError: true,
      message: 'User not found',
    });
  }

  // Update the user's username in the database
  const updatedUser = await prisma.user.update({
    where: { id: loggedInUserId },
    data: { username },
  });

  // Update the username usage record (if applicable)
  try {
    const existingUsernameRecord = await prisma.username.findUnique({
      where: { username },
    });

    if (existingUsernameRecord) {
      await prisma.username.update({
        where: { username },
        data: { usedAt: new Date() },
      });
    } else {
      await prisma.username.create({
        data: { username, usedAt: new Date(), id: loggedInUserId },
      });
    }
  } catch (error) {
    console.error('Error updating username record:', error);
    // Optionally, rollback the user update if critical
  }

  // Update user in Redis
  await updateUserInRedis(loggedInUserId, updatedUser);

  // Respond with updated user
  return apiResponseHandler(res, {
    statusCode: 200,
    hasError: false,
    message: 'User updated successfully',
    data: userResponseHandler(updatedUser),
  });
}