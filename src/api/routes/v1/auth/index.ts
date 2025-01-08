import express, { Request, Response } from 'express';   
import loginController from './controller/loginController';
import signupController from './controller/signupController';
import { generateMagicLink } from './controller/generateMagicLink';
import { verifiyMagicLink } from './controller/verifyMagicLink';
import rateLimit from 'express-rate-limit';
import { refreshTokenController } from './controller/refreshTokenController';
const generateMagicLinkLimiter = rateLimit({
    windowMs: 5 * 60 * 1000, // 5 minutes
    max: 3, // Limit each IP to 3 requests per `windowMs`
    message: {
      statusCode: 429,
      hasError: true,
      message: 'Too many requests, please try again later.',
      errorCode: 'TOO_MANY_REQUESTS',
    },
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false,  // Disable the `X-RateLimit-*` headers
  });

const auth = express.Router();  


auth.post("/login", loginController);
auth.post("/signup", signupController);

auth.post('/magic-link', generateMagicLinkLimiter, generateMagicLink);
auth.post('/magic-link/verify',verifiyMagicLink);
auth.post('/refresh-token', refreshTokenController);



export default auth;

