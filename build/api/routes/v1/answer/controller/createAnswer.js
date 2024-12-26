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
exports.default = createAnswer;
const answerSchema_1 = require("../schema/answerSchema");
const apiResponseHandler_1 = __importDefault(require("../../../../../utils/apiResponseHandler"));
const prisma_1 = require("../../../../../prisma/prisma");
const uuid_1 = require("uuid");
function createAnswer(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const schema = yield answerSchema_1.createAnswerSchema.safeParseAsync(req.body);
        if (!schema.success) {
            (0, apiResponseHandler_1.default)(res, {
                statusCode: 400,
                hasError: true,
                message: 'Invalid request body',
            });
            return;
        }
        const question = yield prisma_1.prisma.question.findUnique({ where: { id: schema.data.questionId } });
        if (!question) {
            (0, apiResponseHandler_1.default)(res, {
                statusCode: 404,
                hasError: true,
                message: 'Question not found',
            });
            return;
        }
        const user = yield prisma_1.prisma.user.findUnique({ where: { id: schema.data.answerTo } });
        if (!user) {
            (0, apiResponseHandler_1.default)(res, {
                statusCode: 404,
                hasError: true,
                message: 'User not found',
            });
            return;
        }
        const answer = yield prisma_1.prisma.response.create({
            data: {
                id: (0, uuid_1.v4)(),
                content: schema.data.content,
                questionId: schema.data.questionId,
                answerTo: schema.data.answerTo,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        });
        (0, apiResponseHandler_1.default)(res, {
            statusCode: 200,
            hasError: false,
            message: 'success',
            data: answer,
        });
    });
}
