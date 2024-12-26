
import z from "zod";


export const updateUserSchema = z.object({
    username: z.string().min(3, { message: "Username must be at least 3 characters" }).max(10, { message: "Username must be less than or equal to 10 characters" }).optional(),
});