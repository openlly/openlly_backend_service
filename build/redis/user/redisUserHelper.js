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
exports.updateUserInRedis = exports.setUserInRedis = exports.removeUserFromRedis = exports.getUserFromRedis = void 0;
const redis_1 = require("../redis");
const redisKeys_1 = __importDefault(require("../redisKeys"));
// Function to get user and token from Redis (fetch)
const getUserFromRedis = (idOrUsername) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Get the token from Redis using the user's id or username
        const redisUserToken = yield redis_1.redis.get(idOrUsername.match(/^\d+$/) ? redisKeys_1.default.userById(idOrUsername) : redisKeys_1.default.userByUsername(idOrUsername));
        if (redisUserToken) {
            const ttl = yield redis_1.redis.ttl(idOrUsername.match(/^\d+$/) ? redisKeys_1.default.userById(idOrUsername) : redisKeys_1.default.userByUsername(idOrUsername));
            if (ttl < 0) {
                // Token expired, remove it from Redis
                yield redis_1.redis.del(idOrUsername.match(/^\d+$/) ? redisKeys_1.default.userById(idOrUsername) : redisKeys_1.default.userByUsername(idOrUsername));
                return null;
            }
            // User token found, return the token
            return JSON.parse(redisUserToken);
        }
        return null; // If no token found
    }
    catch (error) {
        console.error('Error fetching user from Redis:', error);
        throw new Error('Error fetching user from Redis');
    }
});
exports.getUserFromRedis = getUserFromRedis;
const removeUserFromRedis = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Remove the user and token from Redis using the user's id
        yield redis_1.redis.del(redisKeys_1.default.userById(id));
        yield redis_1.redis.del(redisKeys_1.default.userByUsername(id));
    }
    catch (error) {
        console.error('Error removing user from Redis:', error);
        throw new Error('Error removing user from Redis');
    }
});
exports.removeUserFromRedis = removeUserFromRedis;
const setUserInRedis = (id, user) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Set the user and token in Redis using the user's id
        yield redis_1.redis.set(redisKeys_1.default.userById(id), JSON.stringify({ id, user }));
        yield redis_1.redis.set(redisKeys_1.default.userByUsername(user.username), JSON.stringify({ id, user }));
    }
    catch (error) {
        console.error('Error setting user in Redis:', error);
        console.error('Error setting user in Redis:', error);
        throw new Error('Error setting user in Redis');
    }
});
exports.setUserInRedis = setUserInRedis;
const updateUserInRedis = (id, user) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Update the user in Redis using the user's id
        yield redis_1.redis.set(redisKeys_1.default.userById(id), JSON.stringify({ id, user }));
        yield redis_1.redis.set(redisKeys_1.default.userByUsername(user.username), JSON.stringify({ id, user }));
    }
    catch (error) {
        console.error('Error updating user in Redis:', error);
        throw new Error('Error updating user in Redis');
    }
});
exports.updateUserInRedis = updateUserInRedis;
