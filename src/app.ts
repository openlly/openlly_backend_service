import express from 'express';
import v1 from './api/routes/v1';
import bodyParser from 'body-parser';
import { loggerMiddleware } from './api/middleware/loggerMiddleware';
import { connectDB } from './prisma/prisma';
import { connectRedis } from './redis/redis';
import apiResponseHandler from './utils/apiResponseHandler';
import { appConfig } from './utils/appConfig';
import cors from 'cors';
import rateLimit from 'express-rate-limit'; // <---
import mqConnection from './utils/queueService/connection';
const app = express();

// Determine environment
const isProd = appConfig.NODE_ENV === 'production';
const PORT = appConfig.PORT || (isProd ? 80 : 3000);

// Middleware for parsing JSON bodies
app.use(bodyParser.json());

// Logger middleware (applied early)
app.use(loggerMiddleware);

// Enable CORS
app.use(cors({ origin: true }));

// Initialize database, Redis connections  and RabbitMQ
connectDB();
connectRedis();
mqConnection.connect();

// Apply rate limiter
const limiter = rateLimit({
  windowMs: 5 * 60 * 1000, // 5 minutes
  max: 100, // 100 requests per 5 minutes
  message: 'Too many requests. Please try again later.',
});
app.use(limiter);

// Routes
app.use('/api/v1', v1);

app.use((_, res) => {
  apiResponseHandler(res, {
    statusCode: 404,
    hasError: true,
    message: 'Route not found',
  });
});



// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT} in ${isProd ? 'production' : 'development'} mode.`);
});

export default app;