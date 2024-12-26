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
exports.default = deleteQuestion;
const prisma_1 = require("../../../../../prisma/prisma");
const apiResponseHandler_1 = __importDefault(require("../../../../../utils/apiResponseHandler"));
function deleteQuestion(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = req.params.id;
        if (!id) {
            (0, apiResponseHandler_1.default)(res, {
                statusCode: 400,
                hasError: true,
                message: 'id is required',
            });
            return;
        }
        //soft delete
        const question = yield prisma_1.prisma.question.update({
            where: { id: id },
            data: {
                deleteAt: new Date(),
            },
        });
        if (question) {
            (0, apiResponseHandler_1.default)(res, {
                statusCode: 200,
                hasError: false,
                message: 'Record deleted successfully',
                data: null,
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
