import { Request, Response } from 'express';
import { getOneUserUtilById } from '../../../../../utils/user/getOneUser';
import apiResponseHandler from '../../../../../utils/apiResponseHandler';
import { userResponseHandler } from '../../../../../utils/user/userResponseHelper';

export default async function getOneUser(req: Request, res: Response) {
    const currentUserId = req.params.id || req.userId;

    if (!currentUserId) {
        return apiResponseHandler(res, {
            statusCode: 401,
            hasError: true,
            message: 'Unauthorized',
        });
    }

    const currentUser = await getOneUserUtilById({ currentUserId });

    if (currentUser) {
        return apiResponseHandler(res, {
            statusCode: 200,
            hasError: false,
            message: 'success',
            data: userResponseHandler(currentUser),
        });
    }

    return apiResponseHandler(res, {
        statusCode: 404,
        hasError: true,
        message: 'User not found',
    });
}
