import { Request, Response } from 'express';

import apiResponseHandler from '../../../../../../utils/apiResponseHandler';
import { prisma } from '../../../../../../prisma/prisma';
import { createAvatarSchema } from '../schema/createAvatarSchema';
import { v4 as uuidv4 } from 'uuid';
const createAvatar = async (req: Request, res: Response) => {
    //validate request body
    const reqBody = await createAvatarSchema.safeParseAsync(req.body);
    if (!reqBody.success) {
        return apiResponseHandler(res, {
            statusCode: 400,
            hasError: true,
            message: 'Invalid request body',
        });
    }

    //create avatar
    const avatar = await prisma.avatar.create({
        data: { imageUrl: reqBody.data.imageUrl, id: uuidv4() },
    });
    return apiResponseHandler(res, {
        statusCode: 200,
        hasError: false,
        message: 'Avatar created successfully',
        data: avatar,
    });
}

export default createAvatar;