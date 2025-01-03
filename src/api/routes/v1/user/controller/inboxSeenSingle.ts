import { Response, Request } from 'express';  
import { prisma } from '../../../../../prisma/prisma';
import apiResponseHandler from '../../../../../utils/apiResponseHandler';
import { addToEmailQueue } from '../../../../../utils/queueService/notification';
import { getOneUserUtilById } from '../../../../../utils/user/getOneUser';
import { messageAcknowledgmentTemplate } from '../../../../../templates/message-view';
import { questionUrl } from '../../questions/utils/questionUtils';

export default async function inboxSeenSingle(req: Request, res: Response) {
    const {params: { id: answerId } } = req;
    const currentUser = await getOneUserUtilById({ currentUserId: req.userId });
    if (!currentUser) {
        return apiResponseHandler(res, {
            statusCode: 401,
            hasError: true,
            message: 'Unauthorized',
        });
    }

    // Validate answerId
    if (!answerId) {
        return apiResponseHandler(res, {
            statusCode: 400,
            hasError: true,
            message: 'answerId is required',
        });
    }

    // Fetch the message
    const message = await prisma.response.findUnique({
        where: { id: answerId },
    });

    // Handle message not found or already seen
    if (!message || message.seen) {
        return apiResponseHandler(res, {
            statusCode: 200,
            hasError: false,
            message: 'success',
        });
    }

    // Update the message to 'seen'
    await prisma.response.update({
        where: { id: answerId },
        data: { seen: true,ackSentAt: new Date() },
    });

    // Send acknowledgment email if necessary
    if (message.ackEmail && message.ackEmail.length > 0 && message.ackSentAt === null) {
        const questionId = message.questionId;
        //get question detail using question Title
        const questionDetail = await prisma.question.findUnique({ where: { id: questionId } });
        if(questionDetail !== null){
            const url = questionUrl(questionDetail.questionAbrbreviation, currentUser.username);
            const emailContent = messageAcknowledgmentTemplate(
                currentUser.username,
                message.content,
                url,
            );
            addToEmailQueue(
                message.ackEmail,
                `From Openlly, your message has been seen by ${currentUser.username}`,
                emailContent,
            );
        }
       
    }

    // Send response
    return apiResponseHandler(res, {
        statusCode: 200,
        hasError: false,
        message: 'success',
        data: null,
    });
}
