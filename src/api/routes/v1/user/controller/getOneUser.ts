
import  { Request, Response } from 'express';   


import apiResponseHandler from '../../../../../utils/apiResponseHandler'; 
import { getUserFromRedis } from '../../../../../redis/user/redisUserHelper';
import {userResponseHandler} from "../../../../../utils/userResponseHelper";
import { prisma } from '../../../../../prisma/prisma';


export default async function getOneUser(req: Request, res: Response) {
    var currentUserId = (req as any).user?.userId;
    
    if(!currentUserId){
        apiResponseHandler(res, {
            statusCode: 401,
            hasError: true,
            message: 'Unauthorized',
        });
        return;
    }
    if(req.params.id){
        currentUserId= req.params.id;
    }
    //check if user exists in redis
    const user = await getUserFromRedis(currentUserId);
    if(user){
        apiResponseHandler(res, {
            statusCode: 200,
            hasError: false,
            message: 'success',
            data: userResponseHandler(user.user),
        });
        return;
    }
    const currentUser = await prisma.user.findUnique({ where: { id: currentUserId } });
    if (currentUser) {
        apiResponseHandler(res, {
            statusCode: 200,
            hasError: false,
            message: 'success',
            data: userResponseHandler(currentUser),
        });
        return;
    }
    apiResponseHandler(res, {
        statusCode: 404,
        hasError: true,
        message: 'User not found',
    });
    return;
    

    
    
}
