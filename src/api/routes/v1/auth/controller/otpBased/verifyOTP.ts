import { Response, Request } from "express";
import apiResponseHandler from "../../../../../../utils/apiResponseHandler";
import { redis } from "../../../../../../redis/redis";
import { v4 as uuidv4 } from "uuid";
import { prisma } from "../../../../../../prisma/prisma";
import { generateAccessToken, generateRefreshToken } from "../../../../../../utils/jwt/jwtHelper";
import { setUserInRedis } from "../../../../../../redis/user/redisUserHelper";
import schemas from "../../validations/authValidations";
import { userResponseHandler } from "../../../../../../utils/user/userResponseHelper";

export async function verifyOtp(req: Request, res: Response) {
  try {
    // Validate the request body with the schema
    const parsedResult = await schemas.verifyOtpSchema.safeParseAsync(req.body); // Updated schema name
    if (!parsedResult.success) {
      return apiResponseHandler(res, {
        statusCode: 400,
        hasError: true,
        message: parsedResult.error.issues
          .map((issue, index) =>
            index === parsedResult.error.issues.length - 1 ? `and ${issue.message}` : issue.message
          )
          .join(" "),
      });
    }

    const { email, otp } = parsedResult.data;
    const storedOtp = await redis.get(`${email}:otp`);
    if (!storedOtp || storedOtp !== otp) {
      return apiResponseHandler(res, {
        statusCode: 400,
        hasError: true,
        message: "Invalid OTP",
      });
    }

    const ttl = await redis.ttl(`${email}:otp`);
    if (ttl < 0) {
      return apiResponseHandler(res, {
        statusCode: 400,
        hasError: true,
        message: "OTP has expired",
      });
    }

    // Delete the OTP from Redis after successful verification
    await redis.del(`${email}:otp`);

    // Create or update the user in the database
    const user = await prisma.user.upsert({
      where: { email },
      create: {
        id: uuidv4(),
        email,
      },
      update: {},
    });

    // Generate both Access Token and Refresh Token
    const accessToken = generateAccessToken(user.id);
    const refreshToken = generateRefreshToken(user.id);

    // Save user to Redis
    await setUserInRedis(user.id, user);

    apiResponseHandler(res, {
      statusCode: 200,
      hasError: false,
      message: "success",
      data: {
        accessToken, // Send Access Token
        refreshToken, // Send Refresh Token
        user: userResponseHandler(user),
      },
    });
  } catch (error) {
    console.error(error);
    apiResponseHandler(res, {
      statusCode: 500,
      hasError: true,
      message: "Internal server error",
    });
  }
}