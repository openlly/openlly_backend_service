import express from 'express';
import { authMiddleware } from '../../../middleware/authMiddleware';
import fetchAllReport from './controller/fetchAllReport';
import { fetchReportByInboxId } from './controller/fetchReportByInboxid';
import createReport from './controller/createReport';
import rateLimit from 'express-rate-limit';
import { contactEmailController } from './controller/contactEmailController';
import avatarRouter from './avatar';

const utilsRouter = express.Router();

// Apply auth middleware only to specific routes
utilsRouter.use(authMiddleware);

// Routes with authentication
utilsRouter.get('/all-reports', fetchAllReport);
utilsRouter.get('/all-reports/:id', fetchReportByInboxId);
utilsRouter.post('/report', createReport);

// Create rate limiter for the contact route
const rateLimiter = rateLimit({
    windowMs: 5 * 60 * 1000, // 5 minutes
    max: 3, // Limit each IP to 3 requests per `windowMs`
    message: {
        statusCode: 429,
        hasError: true,
        message: 'Too many requests, please try again later.',
        errorCode: 'TOO_MANY_REQUESTS',
    },
    standardHeaders: true,
    legacyHeaders: false,
});

// Create a separate router for the contact route (No Auth Middleware)
const contactRouter = express.Router();
contactRouter.use(rateLimiter);
contactRouter.post("/", contactEmailController);

// Mount the contact router separately without auth middleware
utilsRouter.use("/contact", contactRouter);
utilsRouter.use("/avatar", avatarRouter);

export default utilsRouter;
