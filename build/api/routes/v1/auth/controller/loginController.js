"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = loginController;
const authValidations_1 = __importDefault(require("../validations/authValidations"));
const apiResponseHandler_1 = __importDefault(require("../../../../../utils/apiResponseHandler"));
const jwtHelper_1 = require("../../../../../utils/jwt/jwtHelper");
const prisma_1 = require("../../../../../prisma/prisma");
const password_1 = require("../../../../../utils/bcrypt/password");
const userResponseHelper_1 = require("../../../../../utils/user/userResponseHelper");
const redisUserHelper_1 = require("../../../../../redis/user/redisUserHelper"); // Helper function to save user and token
function loginController(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Validate the request body with the schema
            const loginData = yield authValidations_1.default.loginSchema.safeParseAsync(req.body);
            if (!loginData.success) {
                const message = loginData.error.issues.length > 1
                    ? loginData.error.issues
                        .map((issue, index) => {
                        if (index === loginData.error.issues.length - 1) {
                            return `and ${issue.message}`;
                        }
                        return issue.message;
                    })
                        .join(' ')
                    : loginData.error.issues[0].message;
                return (0, apiResponseHandler_1.default)(res, {
                    statusCode: 400,
                    hasError: true,
                    message,
                });
            }
            const { email, password } = loginData.data;
            let token = null;
            let user = null;
            // Look up the user in the database
            const dbUser = yield prisma_1.prisma.user.findUnique({ where: { email } });
            if (!dbUser) {
                return (0, apiResponseHandler_1.default)(res, {
                    statusCode: 400,
                    hasError: true,
                    message: 'User not found',
                });
            }
            // Validate password
            const isPasswordValid = yield (0, password_1.verifyPassword)(password, dbUser.password);
            if (!isPasswordValid) {
                return (0, apiResponseHandler_1.default)(res, {
                    statusCode: 400,
                    hasError: true,
                    message: 'Invalid password',
                });
            }
            // Generate a new JWT token
            token = (0, jwtHelper_1.generateToken)(dbUser.id);
            // Cache the user data and token in Redis for future use, with an expiration of 1 hour
            yield (0, redisUserHelper_1.setUserInRedis)(dbUser.id, dbUser); // Helper to save user and token in Redis
            // Remove sensitive data (e.g., password) from the user object
            const userWithoutPassword = (0, userResponseHelper_1.userResponseHandler)(dbUser);
            // Send the response
            return (0, apiResponseHandler_1.default)(res, {
                statusCode: 200,
                hasError: false,
                message: 'Login successful',
                data: {
                    token, // The newly generated token
                    user: userWithoutPassword,
                },
            });
        }
        catch (error) {
            console.error('Error in loginController:', error);
            next(error); // Pass the error to the error handler
        }
    });
}
