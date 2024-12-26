import express, { Request, Response, NextFunction } from 'express';
import v1 from './api/routes/v1';
import bodyParser from 'body-parser';
import { loggerMiddleware } from './api/middleware/loggerMiddleware';
import { connectDB } from './prisma/prisma';
import { connectRedis } from './redis/redis';
import apiResponseHandler from './utils/apiResponseHandler';
import { appConfig } from './utils/appConfig';

const app = express();

// Determine environment
const isProd = appConfig.NODE_ENV === 'production';
const PORT = appConfig.PORT || (isProd ? 80 : 3000);

// Middleware for parsing JSON bodies
app.use(bodyParser.json());

// Logger middleware (applied early)
app.use(loggerMiddleware);

// Initialize database and Redis connections
connectDB();
connectRedis();

// Routes
app.use('/api/v1', v1);



// Global error handler middleware
app.use((err: any, _: Request, res: Response, next: NextFunction) => {
  apiResponseHandler(res, {
    statusCode: err.statusCode || 500,
    hasError: true,
    message: err.message,
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT} in ${isProd ? 'production' : 'development'} mode.`);
});

export default app;
