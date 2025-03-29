import { Response, Request } from "express";
import apiResponseHandler from "../../../../../utils/apiResponseHandler";
import { contactUsSchema } from "../schema/schema";
import { contactUsTemplate } from "../../../../../templates/contact-us";
import { appConfig } from "../../../../../utils/appConfig";
import { addToEmailQueue } from "../../../../../utils/queueService/notification";


export const contactEmailController = async (req: Request, res: Response) => {
    try {
        //check if request body is valid    
        const schema = await contactUsSchema.safeParseAsync(req.body);

        if (!schema.success) {
            apiResponseHandler(res, {
                statusCode: 400,
                hasError: true,
                message: 'Invalid request body',
            });
            return;
        }
        //send email
        await addToEmailQueue(appConfig.ADMIN_EMAIL || "admin", "You have a new message", contactUsTemplate(schema.data.name, schema.data.email, schema.data.message));
        apiResponseHandler(res, {
            statusCode: 200,
            hasError: false,
            message: 'Email sent successfully',
        });
    } catch (error) {
        console.error('Error sending email:', error);
        apiResponseHandler(res, {
            statusCode: 500,
            hasError: true,
            message: 'Failed to send email',
        });
    }
}