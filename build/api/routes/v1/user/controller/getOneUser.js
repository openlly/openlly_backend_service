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
exports.default = getOneUser;
const getOneUser_1 = require("../../../../../utils/user/getOneUser");
const apiResponseHandler_1 = __importDefault(require("../../../../../utils/apiResponseHandler"));
const userResponseHelper_1 = require("../../../../../utils/user/userResponseHelper");
function getOneUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        const currentUserId = ((_a = req.user) === null || _a === void 0 ? void 0 : _a.userId) || req.params.id;
        if (!currentUserId) {
            return (0, apiResponseHandler_1.default)(res, {
                statusCode: 401,
                hasError: true,
                message: 'Unauthorized',
            });
        }
        const currentUser = yield (0, getOneUser_1.getOneUserUtil)({ currentUserId });
        if (currentUser) {
            return (0, apiResponseHandler_1.default)(res, {
                statusCode: 200,
                hasError: false,
                message: 'success',
                data: (0, userResponseHelper_1.userResponseHandler)(currentUser),
            });
        }
        return (0, apiResponseHandler_1.default)(res, {
            statusCode: 404,
            hasError: true,
            message: 'User not found',
        });
    });
}
