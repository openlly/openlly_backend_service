import { Response, Request } from "express";
import apiResponseHandler from "../../../../../utils/apiResponseHandler";
import { redis } from "../../../../../redis/redis";
import { v4 as uuidv4 } from "uuid";
import { prisma } from "../../../../../prisma/prisma";
import { generateToken } from "../../../../../utils/jwt/jwtHelper";
import { setUserInRedis } from "../../../../../redis/user/redisUserHelper";
import schemas from "../validations/authValidations";
import { userResponseHandler } from "../../../../../utils/user/userResponseHelper";

export async function verifiyMagicLink(req: Request, res: Response) {
  try {
    // Validate the request body with the schema   
    const parsedResult = await schemas.verfiyMagicLinkSchema.safeParseAsync(req.body);
    if (!parsedResult.success) {
      return apiResponseHandler(res, {
        statusCode: 400,
        hasError: true,
        message: parsedResult.error.issues.map((issue, index) => {
          if (index === parsedResult.error.issues.length - 1) {
            return `and ${issue.message}`;
          }
          return issue.message;
        }).join(' ')
      });
    }
    const { email, token } = parsedResult.data;
    const storedToken = await redis.get(`${email}:magicToken`);
    if (!storedToken || storedToken !== token) {
      return apiResponseHandler(res, {
        statusCode: 400,
        hasError: true,
        message: "Invalid token",
      });
    }

    const ttl = await redis.ttl(`${email}:magicToken`);
    if (ttl < 0) {
      return apiResponseHandler(res, {
        statusCode: 400,
        hasError: true,
        message: "Email verification link has been expired.",
      });
    }

    await redis.del(`${email}:magicToken`);
    const user = await prisma.user.upsert({
      where: { email },
      create: {
        id: uuidv4(),
        email
      },
      update: {},
    });

    const jwtToken = generateToken(user.id);
    await setUserInRedis(user.id, user);

    apiResponseHandler(res, {
      statusCode: 200,
      hasError: false,
      message: "success",
      data: {
        token: jwtToken,
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