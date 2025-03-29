import express from 'express';
import loginController from './controller/basicAuth/loginController';
import signupController from './controller/basicAuth/signupController';
import rateLimit from 'express-rate-limit';
import { refreshTokenController } from './controller/refreshTokenController';
import { generateMagicLink } from './controller/magicLink/generateMagicLink';
import { generateOtp } from './controller/otpBased/generateOTP';
import { verifiyMagicLink } from './controller/magicLink/verifyMagicLink';
import { verifyOtp } from './controller/otpBased/verifyOTP';
import { logoutController } from './controller/logoutController';
import { authMiddleware } from '../../../../api/middleware/authMiddleware';

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

// Basic auth
auth.post("/login", loginController);
auth.post("/signup", signupController);

// Magic link auth
auth.post('/magic-link', generateMagicLinkLimiter, generateMagicLink);
auth.post('/magic-link/verify', verifiyMagicLink);

// OTP auth
auth.post('/otp', generateMagicLinkLimiter, generateOtp);
auth.post('/otp/verify', verifyOtp);

// Refresh token
auth.post('/refresh-token', refreshTokenController);

// Logout route with auth middleware
auth.post('/logout', authMiddleware, logoutController);

export default auth;
