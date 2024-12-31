import { Response, Request}  from "express";
import apiResponseHandler from "../../../../../utils/apiResponseHandler";
import { redis } from "../../../../../redis/redis";
import  crypto, { getRandomValues } from 'crypto';
import schemas from '../validations/authValidations';
import { v4 as uuidv4 } from 'uuid';
import { prisma } from "../../../../../prisma/prisma";
import { generateToken } from "../../../../../utils/jwt/jwtHelper";
import { setUserInRedis } from "../../../../../redis/user/redisUserHelper";
import { userResponseHandler } from "../../../../../utils/user/userResponseHelper";

export async function verifiyMagicLink(req: Request, res: Response){
   try{
    const schema = await schemas.verfiyMagicLinkSchema.safeParseAsync(req.body);  
    if(!schema.success){
        apiResponseHandler(res, {
            statusCode: 400,
            hasError: true,
            message: 'Invalid request body',
        });
        return;
    }
    const email = schema.data.email;
    const token = schema.data.token;
    const storedToken = await redis.get(`${email}:magicToken`);
    if(!storedToken || storedToken !== token){
        apiResponseHandler(res, {
            statusCode: 400,
            hasError: true,
            message: 'Invalid token',
        });
        return;
    }
    //check if token is expired
    const tokenExpiry = await redis.ttl(`${email}:magicToken`);
    if(tokenExpiry < 0){
        apiResponseHandler(res, {
            statusCode: 400,
            hasError: true,
            message: 'Email verification link has been expired.',
        });
        return;
    }
    await redis.del(`${email}:magicToken`);
    var user = await prisma.user.findUnique({where: {email: email}}); 
    if(!user){
        //create user in database
        const newUser = await prisma.user.create({
            data: {
                id: uuidv4(),
                email: email,
                createdAt: new Date(),
                updatedAt: new Date(),
                password: crypto.randomBytes(32).toString('hex'),
            }
        });
            user = newUser; 
        
    }
     // Generate a JWT token
     const jwtToken = generateToken(user.id);

     // Cache the user and token in Redis
     await setUserInRedis(user.id, user); // Helper to save user and token in Redis

     apiResponseHandler(res, {
        statusCode: 200,
        hasError: false,
        message: 'User created successfully',
        data: {
            token: jwtToken,
            user: userResponseHandler(user),
        },
    });

   }catch(error){  
    console.error(error);
    apiResponseHandler(res, {
        statusCode: 500,
        hasError: true,
        message: 'Internal server error',
    })
   }
}