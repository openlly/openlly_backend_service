import { Response,Request } from "express";
import apiResponseHandler from "../../../../../utils/apiResponseHandler";
import { contactUsSchema } from "../schema/schema";
import { sendEmail } from "../../../../../utils/emailer/node-emailer";
import { contactUsTemplate } from "../../../../../templates/contact-us";
import { appConfig } from "../../../../../utils/appConfig";


export const contactEmailController = async (req: Request, res: Response) => {
   try{
     //check if request body is valid    
     const schema = await contactUsSchema.safeParseAsync(req.body);

     if(!schema.success){
         apiResponseHandler(res, {
             statusCode: 400,
             hasError: true,
             message: 'Invalid request body',
         });
         return;
     }
     //send email
     const emailAck = await sendEmail(
         appConfig.ADMIN_EMAIL || "admin",
         "You have a new message",
         contactUsTemplate(
             schema.data.name,
             schema.data.email,
             schema.data.message
         )
     );
     if(!emailAck){
         apiResponseHandler(res, {
             statusCode: 500,
             hasError: true,
             message: 'Failed to send email',
         });
         return;
     }
     apiResponseHandler(res, {
         statusCode: 200,
         hasError: false,
         message: 'Email sent successfully',
         data: null,
     });
   }catch(error){
     console.error('Error sending email:', error);
     apiResponseHandler(res, {
         statusCode: 500,
         hasError: true,
         message: 'Failed to send email',
     });
   }
}