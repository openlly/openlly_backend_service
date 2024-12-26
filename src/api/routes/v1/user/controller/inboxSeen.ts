import {Response, Request} from 'express';  
import { prisma } from '../../../../../prisma/prisma';
import apiResponseHandler from '../../../../../utils/apiResponseHandler';

export default async function inboxSeen(req: Request, res: Response) {
    const userId = (req as any).user?.userId;
    if(!userId){
        apiResponseHandler(res, {
            statusCode: 401,
            hasError: true,
            message: 'Unauthorized',
        });
        return;
    }
    //update where seen false or null
    const seen = await prisma.response.updateMany({
        where: {
            answerTo: userId,
            OR: [
                {
                    seen: false,
                },
                {
                    seen: null,
                },
            ],
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