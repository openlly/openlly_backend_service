import { Request, Response } from 'express';
import { getOneUserUtil } from '../../../../../utils/user/getOneUser';
import apiResponseHandler from '../../../../../utils/apiResponseHandler';
import { userResponseHandler } from '../../../../../utils/user/userResponseHelper';

export default async function getOneUser(req: Request, res: Response) {
    const currentUserId = (req as any).user?.userId || req.params.id;

    if (!currentUserId) {
        return apiResponseHandler(res, {
            statusCode: 401,
            hasError: true,
            message: 'Unauthorized',
        });
    }

    const currentUser = await getOneUserUtil({ currentUserId });

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
