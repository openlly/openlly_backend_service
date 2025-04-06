import { Request, Response } from 'express';

import apiResponseHandler from '../../../../../../utils/apiResponseHandler';
import { prisma } from '../../../../../../prisma/prisma';

const getAvatar = async (req: Request, res: Response) => {
    const { page, limit } = req.query;
    const pageNumber = page ? parseInt(page as string) : 1;
    const limitNumber = limit ? parseInt(limit as string) : 10;
    try {
        const avatars = await prisma.avatar.findMany({
            skip: (pageNumber - 1) * limitNumber,
            take: limitNumber,
        });
        return apiResponseHandler(res, {
            statusCode: 200,
            hasError: false,
            message: 'Avatar fetched successfully',
            data: avatars,
          });
    } catch (error) {
        return apiResponseHandler(res, {
            statusCode: 500,
            hasError: true,
            message: `Error fetching avatar ${error}`,
        
          });
    }
}

export default getAvatar;