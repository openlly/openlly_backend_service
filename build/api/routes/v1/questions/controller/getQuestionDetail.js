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
exports.default = getQuestionDetail;
const apiResponseHandler_1 = __importDefault(require("../../../../../utils/apiResponseHandler"));
const prisma_1 = require("../../../../../prisma/prisma");
const schema_1 = require("../schema/schema");
const getOneUser_1 = require("../../../../../utils/user/getOneUser");
function getQuestionDetail(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        //getQuestionSchema check if query param is valid
        const schema = yield schema_1.getQuestionSchema.safeParseAsync(req.query);
        if (!schema.success) {
            (0, apiResponseHandler_1.default)(res, {
                statusCode: 400,
                hasError: true,
                message: 'Invalid request body',
            });
            return;
        }
        const question = yield prisma_1.prisma.question.findUnique({ where: { id: schema.data.q } });
        if (!question) {
            (0, apiResponseHandler_1.default)(res, {
                statusCode: 404,
                hasError: true,
                message: 'Question not found',
            });
            return;
        }
        //get user from 
        const user = yield (0, getOneUser_1.getOneUserByUsername)({ username: schema.data.u });
        if (!user) {
            (0, apiResponseHandler_1.default)(res, {
                statusCode: 404,
                hasError: true,
                message: 'User not found',
            });
            return;
        }
        //get question detail using question Title 
    });
}
