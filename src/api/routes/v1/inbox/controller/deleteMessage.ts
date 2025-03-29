import { Response, Request } from 'express';
import apiResponseHandler from '../../../../../utils/apiResponseHandler';
import { prisma } from '../../../../../prisma/prisma';

export default async function deleteMessage(req: Request, res: Response) {
    try {
        const { id } = req.params;
        const message = await prisma.response.delete({
            where: { id },
        });
        if (message) {
            apiResponseHandler(res, {
                statusCode: 200,
                hasError: false,
                message: 'Message deleted successfully',
                data: message,
            });
        } else {
            apiResponseHandler(res, {
                statusCode: 404,
                hasError: true,
                message: 'Message not found',
            });
        }
    } catch (error) {
        apiResponseHandler(res, {
            statusCode: 500,
            hasError: true,
            message: 'Internal server error',
        });
    }
}