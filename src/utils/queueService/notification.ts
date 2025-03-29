import mqConnection, { NOTIFICATION_QUEUE } from "./connection";

export enum NotificationType {
  email = "email",
  push = "push",
}

export interface INotificationMessage<T> {
  message: T;
  type: NotificationType;
}

/** Common Function to Send Notifications */
export const enqueueNotification = async <T>(
  notification: INotificationMessage<T>
) => {
  await mqConnection.sendToQueue(NOTIFICATION_QUEUE, notification);
  console.log(`Sent ${notification.type} notification to the queue`);
};

/** Email Notification Interface */
export interface EmailNotificationMessage {
  to: string;
  subject: string;
  html: string;
}

/** Firebase Push Notification Interface */
export interface FirebaseNotificationMessage {
  title: string;
  body: string;
  badge?: number;
  tokens?: string[];
  topic?: string | null;
  data?: Record<string, any>;
  android?: {
    priority: "high" | "normal";
  };
  apns?: {
    payload: {
      aps: {
        alert: {
          title: string;
          body: string;
        };
        sound?: string;
        badge?: number;
      };
    };
  };
}

/** Function to Add Email Notification to Queue */
export const addToEmailQueue = async (email: EmailNotificationMessage) => {
  await enqueueNotification<EmailNotificationMessage>({
    message: email,
    type: NotificationType.email,
  });
};

/** Function to Add Push Notification to Queue */
export const addToPushQueue = async ({
  title,
  body,
  badge = false,
  tokens = [],
  topic = null,
  data = {},
}: {
  title: string;
  body: string;
  badge?: boolean;
  tokens?: string[];
  topic?: string | null;
  data?: Record<string, any>;
}) => {
  const message: FirebaseNotificationMessage = {
    title: title || "Default Title",
    body: body || "Default body message",
    badge: badge ? 1 : 0,
    tokens,
    topic,
    data,
    android: {
      priority: "high",
    },
    apns: {
      payload: {
        aps: {
          alert: {
            title: title || "Default Title",
            body: body || "Default body message",
          },
          sound: "default",
          badge: badge ? 1 : 0,
        },
      },
    },
  };

  await enqueueNotification<FirebaseNotificationMessage>({
    message,
    type: NotificationType.push,
  });
};
