import express from "express";
import { contactEmailController } from "./controller/contactEmailController";
import rateLimit from 'express-rate-limit';
const contactUsRateLimiter = rateLimit({
    windowMs: 5 * 60 * 1000, // 5 minutes
    max: 3, // Limit each IP to 3 requests per `windowMs`
    message: 'Too many requests from this IP, please try again after 5 minutes.',
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false,  // Disable the `X-RateLimit-*` headers
  });

const contactRouter = express.Router();
contactRouter.use(contactUsRateLimiter);

contactRouter.get("/", contactEmailController);

export default contactRouter;

