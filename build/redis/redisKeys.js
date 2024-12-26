"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const redisKeys = {
    //user
    userById: (id) => `user:${id}`,
    userByUsername: (username) => `user:${username}`,
};
exports.default = redisKeys;
