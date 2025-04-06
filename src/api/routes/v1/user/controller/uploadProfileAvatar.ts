import {Request, Response} from 'express';
import apiResponseHandler from '../../../../../utils/apiResponseHandler';
import { prisma } from '../../../../../prisma/prisma';

import { userResponseHandler } from '../../../../../utils/user/userResponseHelper';
import { uploadProfileAvatarSchema } from '../schema/schema';

export default async function uploadProfileAvatar(req: Request, res: Response) {
    //validate request body
    const reqBody = await uploadProfileAvatarSchema.safeParseAsync(req.body);
    if(!reqBody.success){
        apiResponseHandler(res, {
            statusCode: 400,
            hasError: true,
            message: 'Invalid request body',
        });
        return;
    }
    const currentUserId = req.userId
    if(!currentUserId){
        apiResponseHandler(res, {
            statusCode: 401,
            hasError: true,
            message: 'Unauthorized',
        });
        return;
    }
    const {imageUrl, backgroundColor} = reqBody.data;

    
    //update user
   const updatedUser = await prisma.user.update({
        where: {
            id: currentUserId,
        },
        data: {
            profileImg: imageUrl,
            backgroundColor: backgroundColor,
        },
    });
    apiResponseHandler(res, {
        statusCode: 200,
        hasError: false,
        message: 'Profile image uploaded successfully',
        data: userResponseHandler(updatedUser),
    });
}