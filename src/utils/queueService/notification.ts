
import mqConnection, { NOTIFICATION_QUEUE } from "./connection";


export enum NotificationType{
    email,
    push
}
export type INotification = {
  message: object,  
  type: NotificationType
};

export const sendNotification = async (notification: INotification) => {
  await mqConnection.sendToQueue(NOTIFICATION_QUEUE, notification);
  console.log(`Sent the notification to consumer`);
};

export const addToEmailQueue = async (to: string, subject: string, html: string) => {
  await sendNotification({
    message: { to, subject, html },
    type: NotificationType.email,
  });
};
export const addToPushQueue = async (payload: object) => {
  await sendNotification({
    message: payload,
    type: NotificationType.push,
  });
};