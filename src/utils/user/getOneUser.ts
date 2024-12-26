import { prisma } from "../../prisma/prisma";
import { getUserFromRedis } from "../../redis/user/redisUserHelper";

export async function  getOneUserUtil({currentUserId}: {currentUserId: string}){
    const user = await getUserFromRedis(currentUserId);
    if(user){
        return user;
       
    }
    const currentUser = await prisma.user.findUnique({ where: { id: currentUserId } });
    return currentUser;
}