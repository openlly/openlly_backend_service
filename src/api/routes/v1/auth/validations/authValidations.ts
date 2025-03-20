import z from "zod";

const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }).min(1, { message: "Email is required" }),
  password: z.string().min(8, { message: "Password must be at least 8 characters" }),
});
const registerSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }).min(1, { message: "Email is required" }),
  password: z.string().min(8, { message: "Password must be at least 8 characters" }),
});

const magicLinkSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }).min(1, { message: "Email is required" }),
});
const verfiyMagicLinkSchema = z.object({
    email : z.string().email({ message: "Invalid email address" }).min(1, { message: "Email is required" }),
    token : z.string().min(1, { message: "Token is required" }),
})

const verifyOtpSchema = z.object({
    email : z.string().email({ message: "Invalid email address" }).min(1, { message: "Email is required" }),
    otp : z.string().min(6, { message: "OTP must be 6 digits" }),
})

export default { loginSchema, registerSchema, magicLinkSchema,verfiyMagicLinkSchema,verifyOtpSchema };