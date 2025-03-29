import z from 'zod';

export const createReportSchema = z.object({
    inboxId: z.string().min(1, { message: "Inbox ID is required" }),
    type: z.string().min(1, { message: "Type is required" }),
});