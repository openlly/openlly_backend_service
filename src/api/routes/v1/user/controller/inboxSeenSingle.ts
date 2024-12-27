import {Response, Request} from 'express';  
import { prisma } from '../../../../../prisma/prisma';
import apiResponseHandler from '../../../../../utils/apiResponseHandler';

export default async function inboxSeenSingle(req: Request, res: Response) {
    const userId = (req as any).user?.userId;
    const answerId = req.params.id;
    if(!answerId){
        apiResponseHandler(res, {
            statusCode: 400,
            hasError: true,
            message: 'answerId is required',
        });
        return;
    }
    if(!userId){
        apiResponseHandler(res, {
            statusCode: 401,
            hasError: true,
            message: 'Unauthorized',
        });
        return;
    }
    //update single one
    const seen = await prisma.response.update({
        where: {
            id: answerId,
            answerTo: userId,
        },
        data: {
            seen: true,
        },
    });
    if (seen) {
        apiResponseHandler(res, {
            statusCode: 200,
            hasError: false,
            message: 'success',
            data: seen,
        });
    }
}