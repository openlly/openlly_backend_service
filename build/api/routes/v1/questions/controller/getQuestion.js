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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = getQuestions;
const prisma_1 = require("../../../../../prisma/prisma");
const apiResponseHandler_1 = __importDefault(require("../../../../../utils/apiResponseHandler"));
const questionUtils_1 = require("../utils/questionUtils");
const getOneUser_1 = require("../../../../../utils/user/getOneUser");
function getQuestions(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId;
        const limit = 10;
        const page = parseInt(req.query.page, 10) || 1;
        const skip = (page - 1) * limit;
        const questions = yield prisma_1.prisma.question.findMany({
            skip,
            take: limit,
            where: {
                deleteAt: null
            }
        });
        const currentUser = yield (0, getOneUser_1.getOneUserUtil)({ currentUserId: userId });
        const questionParsed = questions.map((question) => {
            const { deleteAt } = question, questionWithoutDeleteAt = __rest(question, ["deleteAt"]);
            return Object.assign(Object.assign({}, questionWithoutDeleteAt), { url: userId ?
                    (0, questionUtils_1.questionUrl)(question.title, currentUser.username) : undefined });
        });
        (0, apiResponseHandler_1.default)(res, {
            hasError: false,
            statusCode: 200,
            message: 'success',
            data: questionParsed,
        });
    });
}
