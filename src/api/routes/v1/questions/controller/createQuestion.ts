import  {Response, Request} from 'express';
import { prisma } from '../../../../../prisma/prisma';
import apiResponseHandler from '../../../../../utils/apiResponseHandler';
import {createQuestionSchema} from '../schema/schema';
import { v4 as uuidv4 } from 'uuid';


export default async function createQuestion(req: Request, res: Response) {
    const parsedResult = await createQuestionSchema.safeParseAsync(req.body);
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
    const question = await prisma.question.create({
        data: {
            id: uuidv4(),
            title,
            content,
            createdAt: new Date(),
            updatedAt: new Date(),
            gradient: gradient
        },        
    });
    apiResponseHandler(res, {
        statusCode: 200,
        hasError: false,
        message: 'success',
        data: question,
    });
}