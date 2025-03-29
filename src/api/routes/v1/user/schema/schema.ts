
import z from "zod";


export const updateUserSchema = z.object({
    username: z.string().min(3, { message: "Username must be at least 3 characters" }).max(30, { message: "Username must be less than or equal to 30 characters" }).optional(),
});

export const updateFcmTokenSchema = z.object({
    fcmToken: z.string().optional(),
});
