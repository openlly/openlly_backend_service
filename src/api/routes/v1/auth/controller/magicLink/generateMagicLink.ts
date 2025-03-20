import { Response, Request}  from "express";
import apiResponseHandler from "../../../../../../utils/apiResponseHandler";
import { redis } from "../../../../../../redis/redis";
import  crypto from 'crypto';
import schemas from '../../validations/authValidations';
import { appConfig, isDevEnv } from "../../../../../../utils/appConfig";
import { emailVerifcationTemplate } from "../../../../../../templates/email-verification";
import { addToEmailQueue } from "../../../../../../utils/queueService/notification";
import { getOneUserByEmail } from "../../../../../../utils/user/getOneUser";



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
            const user =await getOneUserByEmail({email: schema.data.email});
            const isUserExist = user?true:false;

            const email = schema.data.email;
            const magicToken = crypto.randomBytes(32).toString('hex');
            const verificationLink = `${appConfig.APP_CLIENT_URL}/emailVerification/${magicToken}?email=${email}`;
            addToEmailQueue(email, "Verify your email address", emailVerifcationTemplate(verificationLink, isUserExist));
            await redis.set(`${email}:magicToken`, magicToken, 'EX', appConfig.MAGIC_LINK_TTL);
            apiResponseHandler(res, {
                statusCode: 200,
                hasError: false,
                message: 'Magic link has been sent to your email',
                data: isDevEnv?verificationLink:null,
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