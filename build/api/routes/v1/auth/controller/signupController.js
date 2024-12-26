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
exports.default = signupController;
const authValidations_1 = __importDefault(require("../validations/authValidations"));
const uuid_1 = require("uuid");
const apiResponseHandler_1 = __importDefault(require("../../../../../utils/apiResponseHandler"));
const jwtHelper_1 = require("../../../../../utils/jwt/jwtHelper");
const prisma_1 = require("../../../../../prisma/prisma");
const password_1 = require("../../../../../utils/bcrypt/password");
const redisUserHelper_1 = require("../../../../../redis/user/redisUserHelper"); // Helper function to save user and token in Redis
function signupController(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { email, password } = req.body;
            // Validate the request body with the schema
            const parsedResult = yield authValidations_1.default.registerSchema.safeParseAsync({ email, password });
            if (!parsedResult.success) {
                (0, apiResponseHandler_1.default)(res, {
                    statusCode: 400,
                    hasError: true,
                    message: parsedResult.error.issues.map((issue, index) => {
                        if (index === parsedResult.error.issues.length - 1) {
                            return `and ${issue.message}`;
                        }
                        return issue.message;
                    }).join(' ')
                });
                return;
            }
            // Check if user already exists in the database
            const currentUser = yield prisma_1.prisma.user.findUnique({ where: { email } });
            if (currentUser) {
                (0, apiResponseHandler_1.default)(res, {
                    statusCode: 400,
                    hasError: true,
                    message: 'Email already exists',
                });
                return;
            }
            // Hash the password and create the user in the database
            const hashedPassword = yield (0, password_1.createPassword)(password);
            const user = yield prisma_1.prisma.user.create({
                data: { id: (0, uuid_1.v4)(), email, password: hashedPassword }
            });
            // Generate a JWT token
            const token = (0, jwtHelper_1.generateToken)(user.id);
            // Cache the user and token in Redis
            yield (0, redisUserHelper_1.setUserInRedis)(user.id, user); // Helper to save user and token in Redis
            // Return the response
            (0, apiResponseHandler_1.default)(res, {
                statusCode: 200,
                hasError: false,
                message: 'Account created successfully',
                data: {
                    token,
                    user: Object.assign(Object.assign({}, user), { password: undefined }) // Remove password from the user object
                }
            });
        }
        catch (error) {
            console.error('Error in signupController:', error);
            next(error); // Pass the error to the error handler
        }
    });
}
