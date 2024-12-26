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
exports.default = createQuestion;
const prisma_1 = require("../../../../../prisma/prisma");
const apiResponseHandler_1 = __importDefault(require("../../../../../utils/apiResponseHandler"));
const schema_1 = require("../schema/schema");
const uuid_1 = require("uuid");
function createQuestion(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const parsedResult = yield schema_1.createQuestionSchema.safeParseAsync(req.body);
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
        const { title, content, gradient } = parsedResult.data;
        const question = yield prisma_1.prisma.question.create({
            data: {
                id: (0, uuid_1.v4)(),
                title,
                content,
                createdAt: new Date(),
                updatedAt: new Date(),
                gradient: gradient
            },
        });
        (0, apiResponseHandler_1.default)(res, {
            statusCode: 200,
            hasError: false,
            message: 'success',
            data: question,
        });
    });
}
