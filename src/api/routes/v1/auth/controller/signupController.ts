import { NextFunction, Request, Response } from 'express';
import schema from '../validations/authValidations';
import { v4 as uuidv4 } from 'uuid';
import apiResponseHandler from '../../../../../utils/apiResponseHandler'; 
import { generateAccessToken, generateRefreshToken } from '../../../../../utils/jwt/jwtHelper'; // Import both token generators
import { prisma } from '../../../../../prisma/prisma';
import { createPassword } from '../../../../../utils/bcrypt/password';
import { setUserInRedis } from '../../../../../redis/user/redisUserHelper'; // Helper function to save user and token in Redis
import { userResponseHandler } from 'utils/user/userResponseHelper';

export default async function signupController(
  req: Request,
  res: Response,
  next: NextFunction
) {
    try {
        const { email, password } = req.body;

        // Validate the request body with the schema
        const parsedResult = await schema.registerSchema.safeParseAsync({ email, password });
        if (!parsedResult.success) {
            apiResponseHandler(res, {
                statusCode: 400,
                hasError: true,
                message: parsedResult.error.issues.map((issue, index) => {
                    if (index === parsedResult.error.issues.length - 1) {
                        return `and ${issue.message}`;
                    }
                    return issue.message;
                }).join(' ')
            });
            return;
        }

        // Check if user already exists in the database
        const currentUser = await prisma.user.findUnique({ where: { email } });
        if (currentUser) {
            apiResponseHandler(res, {
                statusCode: 400,
                hasError: true,
                message: 'Email already exists',
            });
            return;
        }

        // Hash the password and create the user in the database
        const hashedPassword = await createPassword(password);
        const user = await prisma.user.create({
            data: { id: uuidv4(), email, password: hashedPassword }
        });

        // Generate both Access Token and Refresh Token
        const token = generateAccessToken(user.id);
        const refreshToken = generateRefreshToken(user.id); // Generate refresh token

        // Cache the user and token in Redis
        await setUserInRedis(user.id, user); // Helper to save user and token in Redis

        // Return the response
        apiResponseHandler(res, {
            statusCode: 200,
            hasError: false,
            message: 'Account created successfully',
            data: {
                accessToken:token,       // The newly generated Access Token
                refreshToken,  // The newly generated Refresh Token
                user:  userResponseHandler(user),// Remove password from the user object
            }
        });
    } catch (error) {
        console.error('Error in signupController:', error);
        next(error);  // Pass the error to the error handler
    }
}
