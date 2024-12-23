import Redis from 'ioredis';
import dotenv from 'dotenv';

dotenv.config();
const redisUrl = process.env.REDIS_URL;
if (!redisUrl) {
    console.error('REDIS_URL is not defined');
    process.exit(1);
}

const redis = new Redis(redisUrl, {
    retryStrategy: (times: number) => {
        const delay = Math.min(times * 50, 2000);
        console.log(`Redis connection failed. Trying again after ${delay}ms`);
        return delay;
    },
});

const connectRedis = async () => {
    try {
        // Check if Redis is already connected or connecting
        if (redis.status !== 'connecting' && redis.status !== 'connect') {
            await redis.connect();
            console.log('Connected to Redis');
        } else {
            console.log('Redis is already connected or connecting');
        }
    } catch (error) {
        console.error('Error connecting to Redis:', error);
     
    }
};

export { redis, connectRedis };
