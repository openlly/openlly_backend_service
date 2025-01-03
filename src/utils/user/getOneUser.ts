import { prisma } from "../../prisma/prisma";
import { getUserFromRedis } from "../../redis/user/redisUserHelper";

export const getOneUserUtilById = async ({ currentUserId }: { currentUserId: string }) =>
  (await getUserFromRedis(currentUserId)) ||
  prisma.user.findUnique({ where: { id: currentUserId ?? undefined } });

export const getOneUserByUsername = async ({ username }: { username: string }) =>
  (await getUserFromRedis(username)) ||
  prisma.user.findUnique({ where: { username } });

export const getOneUserByEmail = async ({ email }: { email: string }) =>
  prisma.user.findUnique({ where: { email } });