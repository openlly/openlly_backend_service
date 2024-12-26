import Redis from 'ioredis';
import { appConfig } from '../utils/appConfig';

// Fetch Redis host and port from configuration or environment variables
const redisHost = appConfig.REDIS_HOST;
const redisPort = Number(appConfig.REDIS_PORT);

if (!redisHost || !redisPort) {
    console.error('Redis host or port is not defined');
    process.exit(1);
}

// Create a Redis client instance with the host and port
const redis = new Redis({
    host: redisHost,
    port: redisPort, 
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
