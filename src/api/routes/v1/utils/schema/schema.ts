import z from "zod";

export const contactUsSchema = z.object({
    name: z.string().min(1, { message: "Name is required" }),
    email: z.string().email({ message: "Invalid email address" }).min(1, { message: "Email is required" }),
    message: z.string().min(1, { message: "Message is required" }),
});