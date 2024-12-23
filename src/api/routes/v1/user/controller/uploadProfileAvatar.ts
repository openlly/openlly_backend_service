import {Request, Response} from 'express';
import apiResponseHandler from '../../../../../utils/apiResponseHandler';
import { prisma } from '../../../../../prisma/prisma';
import { v4 as UUID } from 'uuid';
import { userResponseHandler } from '../../../../../utils/userResponseHelper';

export default async function uploadProfileAvatar(req: Request, res: Response) {
    //check if file exists
    if(!req.file){
        apiResponseHandler(res, {
            statusCode: 400,
            hasError: true,
            message: 'File does not exist',
        });
        return;
    }
    //check if file is an image
    if(!req.file.mimetype.startsWith('image/')){ 
        apiResponseHandler(res, {
            statusCode: 400,
            hasError: true,
            message: 'File is not an image',
        });
        return;
    }   
    const currentUserId = (req as any).user?.userId;
    if(!currentUserId){
        apiResponseHandler(res, {
            statusCode: 401,
            hasError: true,
            message: 'Unauthorized',
        });
        return;
    }
    const filename = UUID() + '_' + req.file.originalname;

    //create 
    const user = await prisma.userAvatar.create({
       data: {
           id: UUID(),
           userId: currentUserId,
           avatar: `data:${req.file.mimetype};base64,${Buffer.from(req.file.buffer).toString('base64')}`,
       },
    });
    //update user
   const updatedUser = await prisma.user.update({
        where: {
            id: currentUserId,
        },
        data: {
            profileImg: user.id,
        },
    });
    apiResponseHandler(res, {
        statusCode: 200,
        hasError: false,
        message: 'Profile image uploaded successfully',
        data: userResponseHandler(updatedUser),
    });
}