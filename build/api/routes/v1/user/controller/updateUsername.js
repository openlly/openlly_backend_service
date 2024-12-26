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
exports.default = updateUsername;
const apiResponseHandler_1 = __importDefault(require("../../../../../utils/apiResponseHandler"));
const schema_1 = require("../schema/schema");
const prisma_1 = require("../../../../../prisma/prisma");
const userResponseHelper_1 = require("../../../../../utils/user/userResponseHelper");
const redisUserHelper_1 = require("../../../../../redis/user/redisUserHelper");
function updateUsername(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        const schema = yield schema_1.updateUserSchema.safeParseAsync(req.body);
        if (!schema.success) {
            (0, apiResponseHandler_1.default)(res, {
                statusCode: 400,
                hasError: true,
                message: 'Invalid request body',
            });
            return;
        }
        const user = yield prisma_1.prisma.user.update({
            where: { id: (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId },
            data: schema.data,
        });
        //update user in redis
        (0, redisUserHelper_1.updateUserInRedis)(user.id, user);
        //update in Username user
        try {
            yield prisma_1.prisma.username.update({
                where: { username: schema.data.username },
                data: {
                    usedAt: new Date(),
                }
            });
        }
        catch (error) {
            console.error('Error updating username in Username:', error);
        }
        if (user) {
            (0, apiResponseHandler_1.default)(res, {
                statusCode: 200,
                hasError: false,
                message: 'User updated successfully',
                data: (0, userResponseHelper_1.userResponseHandler)(user),
            });
        }
        else {
            (0, apiResponseHandler_1.default)(res, {
                statusCode: 404,
                hasError: true,
                message: 'User not found',
            });
        }
    });
}
