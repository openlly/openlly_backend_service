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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOneUserUtilById = getOneUserUtilById;
exports.getOneUserByUsername = getOneUserByUsername;
const prisma_1 = require("../../prisma/prisma");
const redisUserHelper_1 = require("../../redis/user/redisUserHelper");
function getOneUserUtilById(_a) {
    return __awaiter(this, arguments, void 0, function* ({ currentUserId }) {
        const user = yield (0, redisUserHelper_1.getUserFromRedis)(currentUserId);
        if (user) {
            return user;
        }
        const currentUser = yield prisma_1.prisma.user.findUnique({ where: { id: currentUserId } });
        return currentUser;
    });
}
function getOneUserByUsername(_a) {
    return __awaiter(this, arguments, void 0, function* ({ username }) {
        const user = yield (0, redisUserHelper_1.getUserFromRedis)(username);
        if (user) {
            return user;
        }
        const currentUser = yield prisma_1.prisma.user.findUnique({ where: { username: username } });
        return currentUser;
    });
}
;
