import z from "zod";


export const createAnswerSchema = z.object({
    content: z.string().min(1, { message: "Content is required" }),
    questionId: z.string().min(1, { message: "Question ID is required" }),
    answerTo: z.string().min(1, { message: "Answer to is required" }),
});

