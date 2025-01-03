import { NextFunction, Request, Response } from 'express';
import schema from '../validations/authValidations';
import apiResponseHandler from '../../../../../utils/apiResponseHandler';
import { generateToken } from '../../../../../utils/jwt/jwtHelper';
import { prisma } from '../../../../../prisma/prisma';
import { verifyPassword } from '../../../../../utils/bcrypt/password';
import { userResponseHandler } from '../../../../../utils/user/userResponseHelper';
import { setUserInRedis } from '../../../../../redis/user/redisUserHelper'; // Helper function to save user and token

export default async function loginController(
  req: Request,
  res: Response,
  next: NextFunction
) {
    try {
        // Validate the request body with the schema
        const loginData = await schema.loginSchema.safeParseAsync(req.body);

        if (!loginData.success) {
            const message = loginData.error.issues.length > 1
                ? loginData.error.issues
                    .map((issue, index) => {
                        if (index === loginData.error.issues.length - 1) {
                            return `and ${issue.message}`;
                        }
                        return issue.message;
                    })
                    .join(' ')
                : loginData.error.issues[0].message;

            return apiResponseHandler(res, {
                statusCode: 400,
                hasError: true,
                message,
            });
        }

        const { email, password } = loginData.data;
        let token = null;
    

        // Look up the user in the database
        const dbUser = await prisma.user.findUnique({ where: { email } });

        if (!dbUser) {
            return apiResponseHandler(res, {
                statusCode: 400,
                hasError: true,
                message: 'User not found',
            });
        }

        // Validate password
        const isPasswordValid = await verifyPassword(password, dbUser.password??"");
        if (!isPasswordValid) {
            return apiResponseHandler(res, {
                statusCode: 400,
                hasError: true,
                message: 'Invalid password',
            });
        }

        // Generate a new JWT token
        token = generateToken(dbUser.id);

        // Cache the user data and token in Redis for future use, with an expiration of 1 hour
        await setUserInRedis(dbUser.id,  dbUser); // Helper to save user and token in Redis

        // Remove sensitive data (e.g., password) from the user object
        const userWithoutPassword = userResponseHandler(dbUser);


        // Send the response
        return apiResponseHandler(res, {
            statusCode: 200,
            hasError: false,
            message: 'Login successful',
            data: {
                token, // The newly generated token
                user: userWithoutPassword,
            },
        });

    } catch (error) {
        console.error('Error in loginController:', error);
        next(error);  // Pass the error to the error handler
    }
}
