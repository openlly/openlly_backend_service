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
exports.connectRedis = exports.redis = void 0;
const ioredis_1 = __importDefault(require("ioredis"));
const appConfig_1 = require("../utils/appConfig");
const redisUrl = appConfig_1.appConfig.REDIS_URL;
if (!redisUrl) {
    console.error('REDIS_URL is not defined');
    process.exit(1);
}
const redis = new ioredis_1.default(redisUrl, {
    retryStrategy: (times) => {
        const delay = Math.min(times * 50, 2000);
        console.log(`Redis connection failed. Trying again after ${delay}ms`);
        return delay;
    },
});
exports.redis = redis;
const connectRedis = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Check if Redis is already connected or connecting
        if (redis.status !== 'connecting' && redis.status !== 'connect') {
            yield redis.connect();
            console.log('Connected to Redis');
        }
        else {
            console.log('Redis is already connected or connecting');
        }
    }
    catch (error) {
        console.error('Error connecting to Redis:', error);
    }
});
exports.connectRedis = connectRedis;
