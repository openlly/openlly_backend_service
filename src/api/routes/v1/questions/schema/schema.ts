
import z from "zod";

export const createQuestionSchema = z.object({
    title: z.string().min(1, { message: "Title is required" }),
    content: z.string().min(1, { message: "Content is required" }),
    gradient: z.array(z.string()).min(2, { message: "At least two gradient colors are required" }),
});

//update question
export const updateQuestionSchema = z.object({
    title: z.string().optional(),
    content: z.string().optional(),
    gradient: z.array(z.string()).optional(),
}).refine((data) => Object.keys(data).length > 0, {
    message: "At least one field is required for update",
});


export const getQuestionSchema = z.object({
    "u": z.string().min(1, { message: "Username is required" }), 
    "q": z.string().min(1, { message: "Question title is required" }),
});

