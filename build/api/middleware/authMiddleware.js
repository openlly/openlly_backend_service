"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const jwtHelper_1 = require("../../utils/jwt/jwtHelper");
const apiResponseHandler_1 = __importDefault(require("../../utils/apiResponseHandler"));
const authMiddleware = (req, res, next) => {
    var _a;
    const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
    if (!token) {
        return (0, apiResponseHandler_1.default)(res, {
            statusCode: 401,
            hasError: true,
            message: 'Authorization header is missing',
        });
    }
    const decodedToken = (0, jwtHelper_1.verifyToken)(token);
    if (!decodedToken || decodedToken.exp < Date.now() / 1000) {
        return (0, apiResponseHandler_1.default)(res, {
            statusCode: 401,
            hasError: true,
            message: decodedToken ? 'Token expired' : 'Invalid token',
            tokenExpired: !!decodedToken,
        });
    }
    req.user = decodedToken;
    next();
};
exports.authMiddleware = authMiddleware;
