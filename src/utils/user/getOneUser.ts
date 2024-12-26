import { prisma } from "../../prisma/prisma";
import { getUserFromRedis } from "../../redis/user/redisUserHelper";

export async function  getOneUserUtilById({currentUserId}: {currentUserId: string}){
    const user = await getUserFromRedis(currentUserId);
    if(user){
        return user;
       
    }
    const currentUser = await prisma.user.findUnique({ where: { id: currentUserId } });
    return currentUser;
}
export async function  getOneUserByUsername({username}: {username: string}){
    const user = await getUserFromRedis(username);
    if(user){
        return user;
       
    }
    const currentUser = await prisma.user.findUnique({ where: { username: username } });
    return currentUser;  
};