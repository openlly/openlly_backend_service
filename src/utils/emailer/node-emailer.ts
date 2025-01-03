import nodeMailer from "nodemailer";
import { appConfig, isDevEnv } from "../appConfig";


//check if config exists

if(!appConfig.SMTP_HOST || !appConfig.SMTP_PORT || !appConfig.SMTP_USER || !appConfig.SMTP_PASS){
    console.error("SMTP config not found. Exiting...");
    process.exit(1);
}


let transporter = nodeMailer.createTransport({
    host: appConfig.SMTP_HOST,
    port: appConfig.SMTP_PORT,
    secure: false,
    auth: {
        user: appConfig.SMTP_USER,
        pass: appConfig.SMTP_PASS,
    },
});

export async function sendEmail(to: string, subject: string, html: string): Promise<Boolean> {
    try {
        const info = await transporter.sendMail({
            from: appConfig.SMTP_FROM,
            to,
            subject,
            html
        });
        return !!info.messageId;
    } catch (err) {
        console.error(err);
        return false;
    }
}
