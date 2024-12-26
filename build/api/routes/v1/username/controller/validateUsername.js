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
exports.default = validateUsername;
const prisma_1 = require("../../../../../prisma/prisma");
const apiResponseHandler_1 = __importDefault(require("../../../../../utils/apiResponseHandler"));
const schema_1 = require("../schema/schema");
function validateUsername(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        //zod validate query parameter
        const schema = yield schema_1.validateUsernameSchema.safeParseAsync(req.query);
        if (!schema.success) {
            (0, apiResponseHandler_1.default)(res, {
                statusCode: 400,
                hasError: true,
                message: 'Invalid request body',
            });
            return;
        }
        const username = schema.data.username;
        //check if username exists in database
        const user = yield prisma_1.prisma.user.findUnique({ where: { username } });
        if (user) {
            (0, apiResponseHandler_1.default)(res, {
                statusCode: 400,
                hasError: true,
                message: 'Username already exists',
                data: true
            });
            return;
        }
        else {
            (0, apiResponseHandler_1.default)(res, {
                statusCode: 200,
                hasError: false,
                message: 'Username is available',
                data: false,
            });
        }
    });
}
