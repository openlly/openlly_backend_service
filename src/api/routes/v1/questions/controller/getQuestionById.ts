import {Response, Request} from 'express';
import { prisma } from '../../../../../prisma/prisma';
import apiResponseHandler from '../../../../../utils/apiResponseHandler';
import { getOneUserUtil } from '../../../../../utils/user/getOneUser';
import { questionUrl } from '../utils/questionUtils';

export default async function getQuestionById(req: Request, res: Response) {
    const userId = (req as any).user?.userId;
    const id = req.params.id;
    if(!id){
        apiResponseHandler(res, {    
            statusCode: 400,
            hasError: true,
            message: 'id is required',
        });
        return; 
    }
    const question = await prisma.question.findUnique({ where: { id: id , deleteAt: null } });
    const currentUser=await getOneUserUtil({currentUserId: userId}); 

    const { deleteAt, ...questionWithoutDeleteAt } = question ?? {};
    //add url to question
    const questionResponse = { ...questionWithoutDeleteAt, url:questionUrl(question?.title??"", currentUser?.username) };
     
    
    if (question) {
        apiResponseHandler(res, {
            statusCode: 200,
            hasError: false,
            message: 'success',
            data: questionResponse,
        });
    } else {
        apiResponseHandler(res, {
            statusCode: 404,
            hasError: true,
            message: 'Question not found',
        });
    }
}