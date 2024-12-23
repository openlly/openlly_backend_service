import {Response, Request} from 'express';
import { prisma } from '../../../../../prisma/prisma';
import apiResponseHandler from '../../../../../utils/apiResponseHandler';

export default async function getQuestionById(req: Request, res: Response) {
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
    
    const { deleteAt, ...questionWithoutDeleteAt } = question ?? {};
    if (question) {
        apiResponseHandler(res, {
            statusCode: 200,
            hasError: false,
            message: 'success',
            data: questionWithoutDeleteAt,
        });
    } else {
        apiResponseHandler(res, {
            statusCode: 404,
            hasError: true,
            message: 'Question not found',
        });
    }
}