

const redisKeys = {
    //user
    userById: (id: string) => `user:${id}`,
    userByUsername: (username: string) => `user:${username}`,
    userVerificationToken: (email: string, token: string) => `userEmailVerification:${email}:${token}`,

}
export default redisKeys;