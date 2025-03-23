import { Request, Response } from 'express';
import apiResponseHandler from '../../../../../utils/apiResponseHandler';
import { updateFcmTokenSchema } from '../schema/schema';
import { prisma } from '../../../../../prisma/prisma';
import { userResponseHandler } from '../../../../../utils/user/userResponseHelper';
import { updateUserInRedis } from '../../../../../redis/user/redisUserHelper';
import { getOneUserUtilById } from '../../../../../utils/user/getOneUser';

export default async function updateFcmToken(req: Request, res: Response) {
  // Validate request body against schema
  const schema = await updateFcmTokenSchema.safeParseAsync(req.body);
  if (!schema.success) {
    return apiResponseHandler(res, {
      statusCode: 400,
      hasError: true,
      message: 'Invalid request body',
    });
  }



  const existingUser = await getOneUserUtilById({
    currentUserId: req.userId,
  });

  if (!existingUser) {
    return apiResponseHandler(res, {
      statusCode: 404,
      hasError: true,
      message: 'User not found',
    });
  }

  

  const userToUpdate = await prisma.user.findUnique({
    where: { id: existingUser.id,fcmToken: schema.data.fcmToken },
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
    where: { id: existingUser.id },
    data: { fcmToken: schema.data.fcmToken },
  });

  // Update the username usage record (if applicable)
 

  // Update user in Redis
  await updateUserInRedis(existingUser.id, updatedUser);

  // Respond with updated user
  return apiResponseHandler(res, {
    statusCode: 200,
    hasError: false,
    message: 'User updated successfully',
    data: userResponseHandler(updatedUser),
  });
}