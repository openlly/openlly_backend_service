import { redis } from "../redis";
import redisKeys from "../redisKeys";


// Function to get user and token from Redis (fetch)
export const getUserFromRedis = async (id: string) => {
  try {
    // Get the token from Redis using the user's id
    const redisUserToken = await redis.get(redisKeys.userById(id));

    if (redisUserToken) {
      const ttl = await redis.ttl(redisKeys.userById(id));
      if (ttl < 0) {
        // Token expired, remove it from Redis
        await redis.del(redisKeys.userById(id));
        return null;
      }
      // User token found, return the token
      return JSON.parse(redisUserToken);
    }

    return null; // If no token found
  } catch (error) {
    console.error('Error fetching user from Redis:', error);
    throw new Error('Error fetching user from Redis');
  }
};

export const setUserInRedis = async (id: string, token: string, user: object) => {
  try {
    // Set the user and token in Redis using the user's id
    await redis.set(
      redisKeys.userById(id),
      JSON.stringify({ user, token }),
      'EX',
      120,
    );
  } catch (error) {
    console.error('Error setting user in Redis:', error);
    throw new Error('Error setting user in Redis');
  }
};