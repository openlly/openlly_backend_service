import { ConsumeMessage } from "amqplib";
import { INotificationMessage, NotificationType } from "./notification";
import { sendEmail } from "../emailer/node-emailer";
import admin from "../../utils/firebase/firebaseAdmin"

export const handleIncomingNotification = async (msg: ConsumeMessage) => {
  try {
    if (!msg?.content) {
      console.error("Received an empty message");
      return;
    }

    const parsedMessage: INotificationMessage<any> = JSON.parse(
      msg.content.toString()
    );

    switch (parsedMessage.type) {
      case NotificationType.email:
        await handleEmailNotification(parsedMessage.message);
        break;

      case NotificationType.push:
        await handlePushNotification(parsedMessage.message);
        break;

      default:
        console.warn(`Unknown notification type: ${parsedMessage.type}`);
    }
  } catch (error) {
    console.error(`Error while parsing the message`, error);
  }
};

/** Handles Email Notification */
const handleEmailNotification = async (emailMessage: {
  to: string;
  subject: string;
  html: string;
}) => {
  try {
    const { to, subject, html } = emailMessage;
    await sendEmail(to, subject, html);
    console.log(`Email sent to ${to}`);
  } catch (error) {
    console.error("Error while sending email", error);
  }
};

/** Handles Push Notification (Placeholder for now) */
const handlePushNotification = async (pushMessage: any) => {
  try {
    console.log("Received push notification:", pushMessage);

    const { title, body, tokens, topic, data, android, apns } = pushMessage;

    // Validate required fields for push notification
    if ((!tokens || !Array.isArray(tokens) || tokens.length === 0) && !topic) {
      throw new Error("No valid tokens or topic provided for push notification");
    }
    if (!title || !body) {
      throw new Error("Missing required fields: title or subject");
    }

    // Define the notification payload
    var payload: any = {
      notification: {
        title,
        body,
      },
      data: data || {},
      android,
      apns,
    };
    
    const firebasePush = admin.messaging();

    if (tokens && tokens.length > 0) {
      // Send push notification to multiple tokens
      payload.tokens = tokens;
       
      const response = await firebasePush.sendEachForMulticast(payload);
      console.log("Messages sent to tokens:", response.successCount, "succeeded,", response.failureCount, "failed","response ", response.responses);
    } else if (topic) {
      payload.topic = topic;
      // Send push notification to a topic
      const response = await firebasePush.sendEach(payload);
      console.log("Topic message sent:", response);
    }
  } catch (error) {
    console.error("Error while handling push notification:", error instanceof Error ? error.message : error);
  }
};

