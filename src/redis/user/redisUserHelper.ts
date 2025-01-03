import { redis } from "../redis";
import redisKeys from "../redisKeys";


// Function to get user and token from Redis (fetch)
export const getUserFromRedis = async (idOrUsername: string) => {
  try {
    // Get the token from Redis using the user's id or username
    const redisUserToken = await redis.get(
      idOrUsername.match(/^\d+$/) ? redisKeys.userById(idOrUsername) : redisKeys.userByUsername(idOrUsername)
    );

    if (redisUserToken) {
      const ttl = await redis.ttl(
        idOrUsername.match(/^\d+$/) ? redisKeys.userById(idOrUsername) : redisKeys.userByUsername(idOrUsername)
      );
      if (ttl < 0) {
        // Token expired, remove it from Redis
        await redis.del(
          idOrUsername.match(/^\d+$/) ? redisKeys.userById(idOrUsername) : redisKeys.userByUsername(idOrUsername)
        );
        return null;
      }
      // User token found, return the token
      return JSON.parse(redisUserToken);
    }

  } catch (error) {
    console.error('Error fetching user from Redis:', error);
  }
  return null;

};


export const removeUserFromRedis = async (id: string) => {
  try {
    // Remove the user and token from Redis using the user's id
    await redis.del(redisKeys.userById(id));
    await redis.del(redisKeys.userByUsername(id));
  } catch (error) {
    console.error('Error removing user from Redis:', error);
    throw new Error('Error removing user from Redis');
  }
};

export const setUserInRedis = async (id: string, user: object) => {
  try {
    // Set the user and token in Redis using the user's id
    await redis.set(redisKeys.userById(id), JSON.stringify({ id, user }));
    await redis.set(redisKeys.userByUsername((user as any).username), JSON.stringify({ id, user }));
  } catch (error) {
    console.error('Error setting user in Redis:', error);
    console.error('Error setting user in Redis:', error);
    throw new Error('Error setting user in Redis');
  }
};

export const updateUserInRedis = async (id: string, user: object) => {
  try {
    // Update the user in Redis using the user's id
    await redis.set(redisKeys.userById(id), JSON.stringify({ id, user }));
    await redis.set(redisKeys.userByUsername((user as any).username), JSON.stringify({ id, user }));
  } catch (error) {
    console.error('Error updating user in Redis:', error);
    throw new Error('Error updating user in Redis');
  }
};