import { Response, Request } from 'express';
import { createAnswerSchema } from '../schema/answerSchema';
import apiResponseHandler from '../../../../../utils/apiResponseHandler';
import { prisma } from '../../../../../prisma/prisma';
import { v4 as uuidv4 } from 'uuid';
import { addToPushQueue } from "../../../../../utils/queueService/notification";
import { getOneUserUtilById } from "../../../../../utils/user/getOneUser";

export default async function createAnswer(req: Request, res: Response) {
    const schema = await createAnswerSchema.safeParseAsync(req.body);
    if (!schema.success) {
        console.error(schema.error);
        return apiResponseHandler(res, {
            statusCode: 400,
            hasError: true,
            message: 'Invalid request body',
        });
    }

    const { questionId, answerTo, content, hint, notifEmail, userIdentity, revealTime } = schema.data;

    let formattedRevealTime: Date | null = null;
    if (revealTime) {
        const selectedTime = new Date(revealTime);
        const currentTime = new Date();
        const timeDifference = (selectedTime.getTime() - currentTime.getTime()) / (1000 * 60 * 60);

        if (isNaN(selectedTime.getTime()) || timeDifference < 2 || timeDifference > 48) {
            return apiResponseHandler(res, {
                statusCode: 400,
                hasError: true,
                message: 'Invalid reveal time. It must be between 2 and 48 hours from now.',
            });
        }
        formattedRevealTime = selectedTime;
    }

    const [question, user] = await Promise.all([
        prisma.question.findUnique({ where: { id: questionId } }),
        getOneUserUtilById({ currentUserId: answerTo })
    ]);

    if (!question) {
        return apiResponseHandler(res, {
            statusCode: 404,
            hasError: true,
            message: 'Question not found',
        });
    }

    if (!user) {
        return apiResponseHandler(res, {
            statusCode: 404,
            hasError: true,
            message: 'User not found',
        });
    }

    await prisma.response.create({
        data: {
            id: uuidv4(),
            content,
            questionId,
            answerTo,
            createdAt: new Date(),
            updatedAt: new Date(),
            hint,
            ackEmail: notifEmail,
            sendIdentity: userIdentity,
            selectedTime: formattedRevealTime,
        },
    });

    if (user.fcmToken) {
        await addToPushQueue({
            title: "New message",
            body: "You have received a new message", // Ensure subtitle is passed
            tokens: [user.fcmToken],
            data: {
                click_action: 'FLUTTER_NOTIFICATION_CLICK',
                type: 'inbox',
            },
        });
    }

    return apiResponseHandler(res, {
        statusCode: 200,
        hasError: false,
        message: 'Success',
    });
}
