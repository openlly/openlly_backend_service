import { Request, Response } from 'express';
import apiResponseHandler from '../../../../../utils/apiResponseHandler';
import { prisma } from '../../../../../prisma/prisma';
import { getOneUserUtilById } from '../../../../../utils/user/getOneUser';

const deleteUser = async (req: Request, res: Response) => {
    const currentUserId = req.userId;
    const currentUser = await getOneUserUtilById({ currentUserId });

    if (!currentUser) {
        return apiResponseHandler(res, {
            statusCode: 404,
            hasError: true,
            message: 'User not found',
        });
    }

    await prisma.user.update({
        where: { id: currentUserId },
        data: { deleteAt: new Date() },
    });

    return apiResponseHandler(res, {
        statusCode: 200,
        hasError: false,
        message: 'User deleted successfully',
    });

}
export default deleteUser;