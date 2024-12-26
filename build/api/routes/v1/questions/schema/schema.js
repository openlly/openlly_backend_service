"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getQuestionSchema = exports.updateQuestionSchema = exports.createQuestionSchema = void 0;
const zod_1 = __importDefault(require("zod"));
exports.createQuestionSchema = zod_1.default.object({
    title: zod_1.default.string().min(1, { message: "Title is required" }),
    content: zod_1.default.string().min(1, { message: "Content is required" }),
    gradient: zod_1.default.array(zod_1.default.string()).min(2, { message: "At least two gradient colors are required" }),
});
//update question
exports.updateQuestionSchema = zod_1.default.object({
    title: zod_1.default.string().optional(),
    content: zod_1.default.string().optional(),
    gradient: zod_1.default.array(zod_1.default.string()).optional(),
}).refine((data) => Object.keys(data).length > 0, {
    message: "At least one field is required for update",
});
exports.getQuestionSchema = zod_1.default.object({
    "u": zod_1.default.string().min(1, { message: "Username is required" }),
    "q": zod_1.default.string().min(1, { message: "Question title is required" }),
});
