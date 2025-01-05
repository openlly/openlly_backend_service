

import {Response, Request} from 'express';  

import apiResponseHandler from '../../../../../utils/apiResponseHandler';

import { prisma } from '../../../../../prisma/prisma';
import { getQuestionSchema } from '../schema/schema';
import { getOneUserByUsername } from '../../../../../utils/user/getOneUser';
import { userResponseHandler } from '../../../../../utils/user/userResponseHelper';


export default async function getQuestionDetail(req: Request, res: Response) {
    //getQuestionSchema check if query param is valid
    const schema = await getQuestionSchema.safeParseAsync(req.query);
    if(!schema.success){
        apiResponseHandler(res, {
            statusCode: 400,
            hasError: true,
            message: 'Invalid request body',
        });
        return;
    }
   
    //get user from 
    const user = await getOneUserByUsername({username: schema.data.u});
    if(!user){
        apiResponseHandler(res, {
            statusCode: 404,
            hasError: true,
            message: 'User not found',
        });
        return;
    }
    //get question detail using question Title 
    const questionDetail = await prisma.question.findUnique({where: {questionAbrbreviation: schema.data.q }});
    

    if(!questionDetail){
        apiResponseHandler(res, {
            statusCode: 404,
            hasError: true, 
            message: 'Question not found',
        });
        return;
    }
    const {deleteAt, createdAt, updatedAt, ...questionDetailWithoutTime} = questionDetail;
    apiResponseHandler(res, {
        statusCode: 200,
        hasError: false,
        message: 'success',
        data: {
            ...questionDetailWithoutTime,
            user: {
                ...userResponseHandler(user),
                email: undefined,
                createdAt: undefined,
                updatedAt: undefined,   
            }
        
        },
    });
   
    
   
}
   