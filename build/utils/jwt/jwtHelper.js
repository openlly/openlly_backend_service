"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = exports.generateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const appConfig_1 = require("../appConfig");
const JWT_SECRET = appConfig_1.appConfig.JWT_SECRET;
const JWT_EXPIRES_MS = Number(appConfig_1.appConfig.JWT_EXPIRES_MS);
const generateToken = (userId) => {
    const expiresIn = JWT_EXPIRES_MS;
    const payload = {
        userId,
        iat: Date.now(),
        exp: Date.now() + expiresIn,
    };
    return jsonwebtoken_1.default.sign(payload, JWT_SECRET);
};
exports.generateToken = generateToken;
const verifyToken = (token) => {
    try {
        const decoded = jsonwebtoken_1.default.verify(token, JWT_SECRET);
        if (decoded.exp < Date.now() / 1000) {
            return null;
        }
        return decoded;
    }
    catch (error) {
        console.error('Error verifying token:', error);
        return null;
    }
};
exports.verifyToken = verifyToken;
