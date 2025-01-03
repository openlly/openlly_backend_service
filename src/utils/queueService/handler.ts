import { ConsumeMessage } from "amqplib";
import { INotification, NotificationType } from "./notification";
import { sendEmail } from "../emailer/node-emailer";

export const handleIncomingNotification = (msg: ConsumeMessage) => {
    try {
      const parsedMessage:INotification = JSON.parse(msg?.content?.toString());
      console.log(`🚀 ~ file: handler.ts:9 ~ handleIncomingNotification ~ parsedMessage`, parsedMessage)
      switch(parsedMessage.type){
        case NotificationType.email:
            try{
                const {to, subject, html: emailHtml} = parsedMessage.message as {to: string, subject: string, html: string};
                sendEmail(to, subject, emailHtml);
            }catch(e){
                console.error("Error while sending email", e);
            }
            break;
        case NotificationType.push:
            break;
      }
    } catch (error) {
      console.error(`Error While Parsing the message`,error);
    }
  };

