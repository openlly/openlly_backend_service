import express, {Response, Request} from 'express';
import { prisma } from '../../../../../prisma/prisma';
import apiResponseHandler from '../../../../../utils/apiResponseHandler';
import { questionUrl } from '../utils/questionUtils';
import { getOneUserUtilById } from '../../../../../utils/user/getOneUser';


export default async function getQuestions(req: Request, res: Response) {
    const userId = (req as any).user?.userId;
    
    const limit = 10;
    const page = parseInt(req.query.page as string, 10) || 1;
    const skip = (page - 1) * limit;
    const questions = await prisma.question.findMany({
        skip,
        take: limit,
        where:{
            deleteAt: null
        }
    });
    const currentUser=await getOneUserUtilById({currentUserId: userId}); 
    const questionParsed = questions.map((question) => {
        const { deleteAt, ...questionWithoutDeleteAt } = question;
        return {
            ...questionWithoutDeleteAt,
            url:userId?
             questionUrl(question.questionAbrbreviation, currentUser.username):undefined,
             
        };
    });
    

    apiResponseHandler(res,{
        hasError:false,
        statusCode:200,
        message:'success',
        data: questionParsed,
    });
}