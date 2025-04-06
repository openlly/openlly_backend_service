import { Response, Request } from 'express';
import { createAnswerSchema } from '../schema/answerSchema';
import apiResponseHandler from '../../../../../utils/apiResponseHandler';
import { prisma } from '../../../../../prisma/prisma';
import { v4 as uuidv4 } from 'uuid';
import { addToPushQueue } from "../../../../../utils/queueService/notification";
import { getOneUserUtilById } from "../../../../../utils/user/getOneUser";
import { generateRandomUserProfileImage, generateRandomUserName, generateRandomUserBackgroundColor } from '../../../../../utils/user/random_user_name';

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

    const { 
        questionId, answerTo, content, hint, notifEmail, userIdentity, revealTime,
        country, region, city, latitude, longitude, timezone,
        device, deviceType, deviceModel, deviceVendor, deviceId, deviceToken, os, browser,
        ipAddress, userAgent, isp, org, asn, asnOrg,
        proxy, hosting, mobile
    } = schema.data;

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

    // Create metadata first
    const metadata = await prisma.anonymousUserMetadata.create({
        data: {
            anonymousUserId: uuidv4(),
            ipAddress,
            userAgent,
            isp,
            org,
            asn,
            asnOrg,
            proxy,
            hosting,
            mobile,
            country,
            region,
            city,
            latitude,
            longitude,
            timezone,
            device,
            deviceType,
            deviceModel,
            deviceVendor,
            deviceId,
            deviceToken,
            os,
            browser,
        },
    });

    // Retry creating anonymous user up to 3 times if username collision occurs
    let anonymousUser;
    let retries = 0;
    const maxRetries = 3;

    while (retries < maxRetries) {
        try {
            anonymousUser = await prisma.anonymousUser.create({
                data: {
                    id: metadata.anonymousUserId,
                    username: generateRandomUserName(),
                    imageUrl: generateRandomUserProfileImage(),
                    backgroundColor: generateRandomUserBackgroundColor(),
                    metadata: {
                        connect: {
                            id: metadata.id
                        }
                    }
                },
            });
            break; // Success - exit the loop
        } catch (error: any) {
            if (error?.code === 'P2002' && error?.meta?.target?.includes('username')) {
                retries++;
                if (retries === maxRetries) {
                    return apiResponseHandler(res, {
                        statusCode: 500,
                        hasError: true,
                        message: 'Failed to generate unique username',
                    });
                }
                continue; // Try again with new random username
            }
            throw error; // Re-throw if it's a different error
        }
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
            anonymousUser: {
                connect: {
                    id: anonymousUser!.id
                }
            }
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
