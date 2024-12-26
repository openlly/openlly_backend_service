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
exports.default = uploadProfileAvatar;
const apiResponseHandler_1 = __importDefault(require("../../../../../utils/apiResponseHandler"));
const prisma_1 = require("../../../../../prisma/prisma");
const userResponseHelper_1 = require("../../../../../utils/user/userResponseHelper");
const cloudinary_1 = require("../../../../../utils/storage/cloudinary");
function uploadProfileAvatar(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        //check if file exists
        if (!req.file) {
            (0, apiResponseHandler_1.default)(res, {
                statusCode: 400,
                hasError: true,
                message: 'File does not exist',
            });
            return;
        }
        //check if file is an image
        if (!req.file.mimetype.startsWith('image/')) {
            (0, apiResponseHandler_1.default)(res, {
                statusCode: 400,
                hasError: true,
                message: 'File is not an image',
            });
            return;
        }
        const currentUserId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId;
        if (!currentUserId) {
            (0, apiResponseHandler_1.default)(res, {
                statusCode: 401,
                hasError: true,
                message: 'Unauthorized',
            });
            return;
        }
        const url = yield (0, cloudinary_1.uploadImage)(req.file);
        if (!url) {
            (0, apiResponseHandler_1.default)(res, {
                statusCode: 500,
                hasError: true,
                message: 'Error uploading image',
            });
            return;
        }
        //update user
        const updatedUser = yield prisma_1.prisma.user.update({
            where: {
                id: currentUserId,
            },
            data: {
                profileImg: url,
            },
        });
        (0, apiResponseHandler_1.default)(res, {
            statusCode: 200,
            hasError: false,
            message: 'Profile image uploaded successfully',
            data: (0, userResponseHelper_1.userResponseHandler)(updatedUser),
        });
    });
}
