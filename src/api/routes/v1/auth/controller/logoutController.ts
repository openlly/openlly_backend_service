import { Request, Response } from 'express';
import apiResponseHandler from '../../../../../utils/apiResponseHandler';
import { prisma } from "../../../../../prisma/prisma";
import { getOneUserUtilById } from "../../../../../utils/user/getOneUser";
export async function logoutController(req: Request, res: Response) {
    try {
        const userId = req.userId;
        const user = await getOneUserUtilById({
            currentUserId: userId
        });
        if (!user) {
            apiResponseHandler(res, {
                statusCode: 404,
                hasError: true,
                message: 'User not found'
            });
            return;
        }
        //check if already  fcm token is null   
        if (user.fcmToken !== null) {
            //delete fcm token
            await prisma.user.update({
                where: { id: user.id },
                data: { fcmToken: null },
            });
        }
        apiResponseHandler(res, {
            statusCode: 200,
            hasError: false,
            message: 'User logged out successfully'
        });
    } catch (error) {
        apiResponseHandler(res, {
            statusCode: 500,
            hasError: true,
            message: 'Failed to log out user'
        });
    }


}

