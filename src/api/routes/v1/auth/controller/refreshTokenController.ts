import { Request, Response } from 'express';
import apiResponseHandler from '../../../../../utils/apiResponseHandler';
import { generateAccessToken, generateRefreshToken, verifyRefreshToken } from '../../../../../utils/jwt/jwtHelper';

export async function refreshTokenController(req: Request, res: Response) {
    const { refreshToken } = req.body;

    if (!refreshToken) {
        return apiResponseHandler(res, {
            statusCode: 400,
            hasError: true,
            message: 'Refresh Token is required',
        });
    }

    const decoded = verifyRefreshToken(refreshToken);

    if (!decoded) {
        return apiResponseHandler(res, {
            statusCode: 401,
            hasError: true,
            message: 'Invalid or expired refresh token',
        });
    }

    const newAccessToken = generateAccessToken(decoded.userId);
    const newRefreshToken = generateRefreshToken(decoded.userId);

    apiResponseHandler(res, {
        statusCode: 200,
        hasError: false,
        message: 'Success',
        data: {
            token: newAccessToken,
            refreshToken: newRefreshToken,
        }
    });
};
