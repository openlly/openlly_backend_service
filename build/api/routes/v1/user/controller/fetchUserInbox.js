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
exports.fetchUserInbox = void 0;
const prisma_1 = require("../../../../../prisma/prisma");
const apiResponseHandler_1 = __importDefault(require("../../../../../utils/apiResponseHandler"));
const fetchUserInbox = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId;
    if (!userId) {
        (0, apiResponseHandler_1.default)(res, {
            statusCode: 401,
            hasError: true,
            message: 'Unauthorized',
        });
        return;
    }
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const skip = (page - 1) * limit;
    const answers = yield prisma_1.prisma.response.findMany({
        where: {
            answerTo: userId,
        },
        orderBy: {
            createdAt: 'desc',
        },
        skip,
        take: limit,
    });
    const fetchQuestions = yield prisma_1.prisma.question.findMany({
        where: {
            id: {
                in: answers.map((answer) => answer.questionId),
            },
            deleteAt: null,
        },
        skip,
        take: limit,
    });
    const response = answers.map((answer) => {
        const question = fetchQuestions.find((question) => question.id === answer.questionId);
        return Object.assign(Object.assign({}, answer), { question: question ? Object.assign(Object.assign({}, question), { deleteAt: undefined }) : null, questionId: undefined, answerId: undefined });
    });
    (0, apiResponseHandler_1.default)(res, {
        statusCode: 200,
        hasError: false,
        data: response,
        message: 'success',
    });
});
exports.fetchUserInbox = fetchUserInbox;
