import  {Response, Request} from 'express';
import { prisma } from '../../../../../prisma/prisma';
import apiResponseHandler from '../../../../../utils/apiResponseHandler';
import {updateQuestionSchema} from '../schema/schema';

export default async function updateQuestion(req: Request, res: Response) {
    const id = req.params.id;
    if(!id){
        apiResponseHandler(res, {    
            statusCode: 400,
            hasError: true,
            message: 'id is required',
        });
        return; 
    }
    const parsedResult = await updateQuestionSchema.safeParseAsync(req.body);
    if (!parsedResult.success) {
        apiResponseHandler(res, {
            statusCode: 400,
            hasError: true,
            message: parsedResult.error.issues.map((issue, index) => {
                if (index === parsedResult.error.issues.length - 1) {
                    return `and ${issue.message}`;
                }
                return issue.message;
            }).join(' ')
        });
        return;
    }
    const {title,content,gradient}=parsedResult.data;
    const question = await prisma.question.update({
        where: {
            id,
        },
        data: {
            title,
            content,
            updatedAt: new Date(),
            gradient: gradient
        },
    });
    const { deleteAt, ...questionWithoutDeleteAt } = question ?? {};

    apiResponseHandler(res, {
        statusCode: 200,
        hasError: false,
        message: 'success',
        data: questionWithoutDeleteAt,
    });
}