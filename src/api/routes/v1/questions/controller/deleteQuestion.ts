import  {Response, Request} from 'express';
import { prisma } from '../../../../../prisma/prisma';
import apiResponseHandler from '../../../../../utils/apiResponseHandler';

export default async function deleteQuestion(req: Request, res: Response) {
    const id = req.params.id;
    if(!id){
        apiResponseHandler(res, {    
            statusCode: 400,
            hasError: true,
            message: 'id is required',
        });
        return; 
    }
    //soft delete
    const question = await prisma.question.update({
        where: { id: id },
        data: {
            deleteAt: new Date(),
        },
    });
    if (question) {
        apiResponseHandler(res, {
            statusCode: 200,
            hasError: false,
            message: 'Record deleted successfully',
            data: null,
        });
    } else {
        apiResponseHandler(res, {
            statusCode: 404,
            hasError: true,
            message: 'Question not found',
        });
    }
}