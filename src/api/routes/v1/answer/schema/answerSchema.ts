import z from "zod";

export const createAnswerSchema = z.object({
    content: z.string().min(1, { message: "Content is required" }),
    questionId: z.string().min(1, { message: "Question ID is required" }),
    answerTo: z.string().min(1, { message: "Answer to is required" }),
    hint: z.string().optional().nullable().refine((v) => v === null || v === undefined || v.length > 0, {
        message: "Hint must be at least 1 character",
    }),
    notifEmail: z
        .string()
        .email({ message: "Invalid email format" })  // Ensure valid email format
        .optional()
        .nullable()
        .refine((v) => v === null || v === undefined || v.length > 0, {
            message: "Notification email must be at least 1 character",
        }),
    userIdentity: z.string().optional().nullable().refine((v) => v === null || v === undefined || v.length > 0, {
        message: "User identity must be at least 1 character",
    }),
    revealTime: z.string().optional().nullable().refine((v) => v === null || v === undefined || v.length > 0, {
        message: "Reveal time must be at least 1 character",
    }),
});
