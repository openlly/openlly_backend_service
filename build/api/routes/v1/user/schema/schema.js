"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserSchema = void 0;
const zod_1 = __importDefault(require("zod"));
exports.updateUserSchema = zod_1.default.object({
    username: zod_1.default.string().min(3, { message: "Username must be at least 3 characters" }).max(10, { message: "Username must be less than or equal to 10 characters" }).optional(),
});
