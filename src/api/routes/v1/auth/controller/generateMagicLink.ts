import { Response, Request}  from "express";
import apiResponseHandler from "../../../../../utils/apiResponseHandler";
import { redis } from "../../../../../redis/redis";
import  crypto from 'crypto';
import schemas from '../validations/authValidations';
import { appConfig } from "../../../../../utils/appConfig";
import { emailVerifcationTemplate } from "../../../../../templates/email-verification";
import { sendEmail } from "../../../../../utils/emailer/node-emailer";



export async function generateMagicLink(req: Request, res: Response) {
    try {
        //check if request body is valid
        const schema = await schemas.magicLinkSchema.safeParseAsync(req.body);
        if(!schema.success){
            apiResponseHandler(res, {
                statusCode: 400,
                hasError: true,
                message: 'Email is required', 
            });
            return;
        }

            const email = schema.data.email;
            const magicToken = crypto.randomBytes(32).toString('hex');
            const verificationLink = `${appConfig.APP_CLIENT_URL}/emailVerification/${magicToken}`;
            const emailAck = await sendEmail(
                email,
                "Verify your email address",
                emailVerifcationTemplate(verificationLink, false)
            );
            if(!emailAck){
                apiResponseHandler(res, {
                    statusCode: 500,
                    hasError: true,
                    message: 'Email could not be sent',
                });
                return;
            }
            await redis.set(`${email}:magicToken`, magicToken, 'EX', appConfig.MAGIC_LINK_TTL);
            apiResponseHandler(res, {
                statusCode: 200,
                hasError: false,
                message: 'Magic link has been sent to your email',
                data: verificationLink,
            });
    } catch (error) {
        console.error(error);
        apiResponseHandler(res, {
            statusCode: 500,
            hasError: true,
            message: 'Internal server error',
        });
    }

    

}