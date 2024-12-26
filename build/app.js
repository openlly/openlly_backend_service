"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const v1_1 = __importDefault(require("./api/routes/v1"));
const body_parser_1 = __importDefault(require("body-parser"));
const loggerMiddleware_1 = require("./api/middleware/loggerMiddleware");
const prisma_1 = require("./prisma/prisma");
const redis_1 = require("./redis/redis");
const apiResponseHandler_1 = __importDefault(require("./utils/apiResponseHandler"));
const appConfig_1 = require("./utils/appConfig");
const app = (0, express_1.default)();
// Determine environment
const isProd = appConfig_1.appConfig.NODE_ENV === 'production';
const PORT = appConfig_1.appConfig.PORT || (isProd ? 80 : 3000);
// Middleware for parsing JSON bodies
app.use(body_parser_1.default.json());
// Logger middleware (applied early)
app.use(loggerMiddleware_1.loggerMiddleware);
// Initialize database and Redis connections
(0, prisma_1.connectDB)();
(0, redis_1.connectRedis)();
// Routes
app.use('/api/v1', v1_1.default);
// Global error handler middleware
app.use((err, _, res, next) => {
    (0, apiResponseHandler_1.default)(res, {
        statusCode: err.statusCode || 500,
        hasError: true,
        message: err.message,
    });
});
// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT} in ${isProd ? 'production' : 'development'} mode.`);
});
exports.default = app;
