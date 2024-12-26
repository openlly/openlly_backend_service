"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAnswerSchema = void 0;
const zod_1 = __importDefault(require("zod"));
exports.createAnswerSchema = zod_1.default.object({
    content: zod_1.default.string().min(1, { message: "Content is required" }),
    questionId: zod_1.default.string().min(1, { message: "Question ID is required" }),
    answerTo: zod_1.default.string().min(1, { message: "Answer to is required" }),
});
