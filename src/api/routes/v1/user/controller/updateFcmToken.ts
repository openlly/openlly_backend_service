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

  // Get the user by ID
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

  // If fcmToken is null or empty, remove it from the database
  const fcmTokenValue = schema.data.fcmToken?.trim() || null;

  const updatedUser = await prisma.user.update({
    where: { id: existingUser.id },
    data: { fcmToken: fcmTokenValue },
  });

  // Update user in Redis
  await updateUserInRedis(existingUser.id, updatedUser);

  return apiResponseHandler(res, {
    statusCode: 200,
    hasError: false,
    message: fcmTokenValue ? 'FCM token updated successfully' : 'FCM token removed successfully',
    data: userResponseHandler(updatedUser),
  });
}
