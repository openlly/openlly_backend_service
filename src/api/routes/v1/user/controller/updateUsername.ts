import {Request, Response} from 'express';

import apiResponseHandler from '../../../../../utils/apiResponseHandler';

import {updateUserSchema} from '../schema/schema'; 
import { prisma } from '../../../../../prisma/prisma';
import { userResponseHandler } from '../../../../../utils/user/userResponseHelper';
import { updateUserInRedis } from '../../../../../redis/user/redisUserHelper';


export default async function updateUsername(req: Request, res: Response) {
    const schema = await updateUserSchema.safeParseAsync(req.body);
    if(!schema.success){
        apiResponseHandler(res, {
            statusCode: 400,
            hasError: true,
            message: 'Invalid request body',
        });
        return;
    }
    const user = await prisma.user.update({
        where: { id: (req as any).user?.userId },
        data: schema.data,
    });
    //update user in redis
    updateUserInRedis(user.id, user);
    //update in Username user
    try {
        await prisma.username.update({
            where: { username: schema.data.username },
            data: {
                usedAt: new Date(),
            }
        });
    } catch (error) {
        console.error('Error updating username in Username:', error);
    }

    if (user) {
        apiResponseHandler(res, {
            statusCode: 200,
            hasError: false,
            message: 'User updated successfully',
            data: userResponseHandler(user),
        });
    } else {
        apiResponseHandler(res, {
            statusCode: 404,
            hasError: true,
            message: 'User not found',
        });
    }
}

