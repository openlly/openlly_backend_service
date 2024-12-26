

const redisKeys = {
    //user
    userById: (id: string) => `user:${id}`,
    userByUsername: (username: string) => `user:${username}`,

    
    
}
export default redisKeys;