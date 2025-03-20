import {Response, Request} from 'express';  

import { prisma } from '../../../../../prisma/prisma';
import apiResponseHandler from '../../../../../utils/apiResponseHandler';
import { validateUsernameSchema } from '../schema/schema';

export default async function validateUsername(req: Request, res: Response) {
   //zod validate query parameter
   const schema = await validateUsernameSchema.safeParseAsync(req.query);
   if(!schema.success){
        apiResponseHandler(res, {
            statusCode: 400,
            hasError: true,
            message: 'Invalid request body',
        });
        return;
   }
   const username = schema.data.username.toLowerCase();

   //check if username exists in database (case insensitive)
   const user = await prisma.user.findFirst({
       where: {
           username: {
               equals: username,
               mode: 'insensitive'
           }
       }
   });
   if (user) {
        apiResponseHandler(res, {
            statusCode: 400,
            hasError: true,
            message: 'Username already exists',
            data: true
        });
        return;
    } else {
        apiResponseHandler(res, {
            statusCode: 200,
            hasError: false,
            message: 'Username is available',
            data: false,
        });
    } 
}