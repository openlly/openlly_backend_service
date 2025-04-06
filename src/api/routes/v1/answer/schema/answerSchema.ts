import z from "zod";

// Base schema for required fields
const baseSchema = {
    content: z.string().min(1, { message: "Content is required" }),
    questionId: z.string().min(1, { message: "Question ID is required" }),
    answerTo: z.string().min(1, { message: "Answer to is required" }),
};

// Schema for optional string fields with length validation
const optionalStringSchema = z.string().optional().nullable().refine(
    (v) => v === null || v === undefined || v.length > 0,
    { message: "Field must be at least 1 character if provided" }
);

// Schema for location-related fields
const locationFields = {
    country: optionalStringSchema,
    region: optionalStringSchema,
    city: optionalStringSchema,
    latitude: z.number().optional().nullable(),
    longitude: z.number().optional().nullable(),
    timezone: optionalStringSchema,
};

// Schema for device-related fields
const deviceFields = {
    device: optionalStringSchema,
    deviceType: optionalStringSchema,
    deviceModel: optionalStringSchema,
    deviceVendor: optionalStringSchema,
    deviceId: optionalStringSchema,
    deviceToken: optionalStringSchema,
    os: optionalStringSchema,
    browser: optionalStringSchema,
};

// Schema for network-related fields
const networkFields = {
    ipAddress: optionalStringSchema,
    userAgent: optionalStringSchema,
    isp: optionalStringSchema,
    org: optionalStringSchema,
    asn: optionalStringSchema,
    asnOrg: optionalStringSchema,
};

// Schema for IP-related fields
const ipFields = {
    proxy: z.boolean().optional().nullable(),
    hosting: z.boolean().optional().nullable(),
    mobile: z.boolean().optional().nullable()
};

export const createAnswerSchema = z.object({
    ...baseSchema,
    hint: optionalStringSchema,
    notifEmail: z
        .string()
        .email({ message: "Invalid email format" })
        .optional()
        .nullable()
        .refine((v) => v === null || v === undefined || v.length > 0, {
            message: "Notification email must be at least 1 character",
        }),
    userIdentity: optionalStringSchema,
    revealTime: optionalStringSchema,
    ...locationFields,
    ...deviceFields,
    ...networkFields,
    ...ipFields
});


