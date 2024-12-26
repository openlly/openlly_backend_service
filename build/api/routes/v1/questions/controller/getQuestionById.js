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
exports.default = getQuestionById;
const prisma_1 = require("../../../../../prisma/prisma");
const apiResponseHandler_1 = __importDefault(require("../../../../../utils/apiResponseHandler"));
const getOneUser_1 = require("../../../../../utils/user/getOneUser");
const questionUtils_1 = require("../utils/questionUtils");
function getQuestionById(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a, _b;
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId;
        const id = req.params.id;
        if (!id) {
            (0, apiResponseHandler_1.default)(res, {
                statusCode: 400,
                hasError: true,
                message: 'id is required',
            });
            return;
        }
        const question = yield prisma_1.prisma.question.findUnique({ where: { id: id, deleteAt: null } });
        const currentUser = yield (0, getOneUser_1.getOneUserUtil)({ currentUserId: userId });
        const _c = question !== null && question !== void 0 ? question : {}, { deleteAt } = _c, questionWithoutDeleteAt = __rest(_c, ["deleteAt"]);
        //add url to question
        const questionResponse = Object.assign(Object.assign({}, questionWithoutDeleteAt), { url: (0, questionUtils_1.questionUrl)((_b = question === null || question === void 0 ? void 0 : question.title) !== null && _b !== void 0 ? _b : "", currentUser === null || currentUser === void 0 ? void 0 : currentUser.username) });
        if (question) {
            (0, apiResponseHandler_1.default)(res, {
                statusCode: 200,
                hasError: false,
                message: 'success',
                data: questionResponse,
            });
        }
        else {
            (0, apiResponseHandler_1.default)(res, {
                statusCode: 404,
                hasError: true,
                message: 'Question not found',
            });
        }
    });
}
