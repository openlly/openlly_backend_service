import {Request, Response} from 'express';
import apiResponseHandler from '../../../../../utils/apiResponseHandler';
import { prisma } from '../../../../../prisma/prisma';

import { userResponseHandler } from '../../../../../utils/user/userResponseHelper';
import {uploadImage} from '../../../../../utils/storage/cloudinary';


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
    const currentUserId = req.userId
    if(!currentUserId){
        apiResponseHandler(res, {
            statusCode: 401,
            hasError: true,
            message: 'Unauthorized',
        });
        return;
    }
    const url = await uploadImage(req.file);    
    
    
    
    if (!url) {
        apiResponseHandler(res, {
            statusCode: 500,
            hasError: true,
            message: 'Error uploading image',
        });
        return;
    }


    
   

   
  
   
    
    

    
    //update user
   const updatedUser = await prisma.user.update({
        where: {
            id: currentUserId,
        },
        data: {
            profileImg: url,
        },
    });
    apiResponseHandler(res, {
        statusCode: 200,
        hasError: false,
        message: 'Profile image uploaded successfully',
        data: userResponseHandler(updatedUser),
    });
}