import  { Request, Response } from 'express';   
import { prisma } from '../../../../../prisma/prisma';
import apiResponseHandler from '../../../../../utils/apiResponseHandler';
import { questionUrl } from '../../questions/utils/questionUtils';
import { getOneUserUtilById } from '../../../../../utils/user/getOneUser';
export const fetchUserInbox = async (req: Request, res: Response) => {
    const userId = req.userId
    if(!userId){
        apiResponseHandler(res, {
            statusCode: 401,
            hasError: true,
            message: 'Unauthorized',
        });
        return;
    }
    let fetchAll = true;
    
    const user = await getOneUserUtilById({currentUserId: userId});
    if(user.id !=req.userId){
        apiResponseHandler(res, {
            statusCode: 401,
            hasError: true,
            message: 'Unauthorized',
        });
        return;
    }
    const page = parseInt(req.query.page as string, 10) || 1;
    const limit = parseInt(req.query.limit as string, 10) || 10;
    const skip = (page - 1) * limit;
    const filter = req.query.filter as string;
    if(filter === 'unread'){
        fetchAll = false;
    }
    // Get total message count
    const totalMessages = await prisma.response.count({
        where: {
            answerTo: userId,
        }
    });
    
    // Get total unread message count
    const totalUnreadMessages = await prisma.response.count({
        where: {
            answerTo: userId,
            seen: false || null,
        }
    });
    
    const answers = await prisma.response.findMany({
        where: {
            answerTo: userId,
            ...(fetchAll ? {} : { seen: false || null }),
        },
        orderBy: {
            createdAt: 'desc',
        },
        skip,
        take: limit,
    });
    const fetchQuestions = await prisma.question.findMany({
        where: {
            id: {
                in: answers.map((answer) => answer.questionId),
            },
            deleteAt: null,
        },
        orderBy: {
            createdAt: 'desc',
        },
        skip,
        take: limit,
    });
    const response = answers.map((answer) => {
        const question = fetchQuestions.find((question) => question.id === answer.questionId);
        return {
            ...answer,
            seen: answer.seen === null ? false : answer.seen,
            question: question ? { ...question, url: questionUrl(question.questionAbrbreviation, user.username) } : null,
        };
    });
    apiResponseHandler(res, {
        statusCode: 200,
        hasError: false,
        data: {
            messages: response,
            totalMessages,
            totalUnreadMessages
        },
        message: 'success',
    });
}