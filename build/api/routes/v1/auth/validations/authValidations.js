"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = __importDefault(require("zod"));
const loginSchema = zod_1.default.object({
    email: zod_1.default.string().email({ message: "Invalid email address" }).min(1, { message: "Email is required" }),
    password: zod_1.default.string().min(8, { message: "Password must be at least 8 characters" }),
});
const registerSchema = zod_1.default.object({
    email: zod_1.default.string().email({ message: "Invalid email address" }).min(1, { message: "Email is required" }),
    password: zod_1.default.string().min(8, { message: "Password must be at least 8 characters" }),
});
exports.default = { loginSchema, registerSchema };
