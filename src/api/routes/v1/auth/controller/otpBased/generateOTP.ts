import { Response, Request } from "express";
import apiResponseHandler from "../../../../../../utils/apiResponseHandler";
import { redis } from "../../../../../../redis/redis";
import crypto from 'crypto';
import schemas from '../../validations/authValidations';
import { appConfig, isDevEnv } from "../../../../../../utils/appConfig";
import { emailVerificationOtpTemplate } from "../../../../../../templates/email-otp"; // Use the OTP template
import { addToEmailQueue } from "../../../../../../utils/queueService/notification";
import { getOneUserByEmail } from "../../../../../../utils/user/getOneUser";

export async function generateOtp(req: Request, res: Response) {
  try {
    // Check if request body is valid
    const schema = await schemas.magicLinkSchema.safeParseAsync(req.body);
    if (!schema.success) {
      apiResponseHandler(res, {
        statusCode: 400,
        hasError: true,
        message: 'Email is required',
      });
      return;
    }

    const user = await getOneUserByEmail({ email: schema.data.email });
    const isUserExist = user ? true : false;

    const email = schema.data.email;
    // Generate a 6-digit OTP
    const otp = crypto.randomInt(100000, 1000000).toString(); // 6-digit OTP    // Send OTP via email
    addToEmailQueue(email, "Verify your email address", emailVerificationOtpTemplate(otp, isUserExist));
    // Store OTP in Redis with expiration (same TTL as magic link)
    await redis.set(`${email}:otp`, otp, 'EX', appConfig.MAGIC_LINK_TTL);

    apiResponseHandler(res, {
      statusCode: 200,
      hasError: false,
      message: 'OTP has been sent to your email',
      data: isDevEnv ? { otp } : null, // Return OTP in dev env for testing
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