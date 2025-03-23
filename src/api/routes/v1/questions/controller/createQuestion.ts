import { Response, Request } from 'express';
import { prisma } from '../../../../../prisma/prisma';
import apiResponseHandler from '../../../../../utils/apiResponseHandler';
import { createQuestionSchema } from '../schema/schema';
import { v4 as uuidv4 } from 'uuid';


export default async function createQuestion(req: Request, res: Response) {
    try{
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
    const { title, content, gradient } = parsedResult.data;
    const toCamelCase = (str: string) =>
        str
            .replace(/[^a-zA-Z0-9\s]/g, "") // Remove special characters
            .replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, function (match, index) {
                if (+match === 0) return ""; // Skip numbers
                return index === 0 ? match.toLowerCase() : match.toUpperCase();
            })
            .replace(/\s/g, ""); // Remove spaces

    const queryAbrivationUnqiue = toCamelCase(title);
    const question = await prisma.question.create({
        data: {
            id: uuidv4(),
            title,
            content,
            createdAt: new Date(),
            updatedAt: new Date(),
            gradient: gradient,
            questionAbrbreviation: queryAbrivationUnqiue
        },
    });
    apiResponseHandler(res, {
        statusCode: 200,
        hasError: false,
        message: 'success',
        data: question,
    });
    }catch(error){
        apiResponseHandler(res, {
            statusCode: 500,
            hasError: true,
            message: 'Internal server error',
        });
    }
}