import client, { Connection, Channel } from "amqplib";
import { appConfig } from "../appConfig";
import { handleIncomingNotification } from "./handler";
const { rmqUser, rmqPass, rmqhost } = appConfig;    
if(!rmqUser || !rmqPass || !rmqhost){
    console.error("RabbitMQ config not found. Exiting...");
    process.exit(1);
}
export const NOTIFICATION_QUEUE = "@notification";
class RabbitMQConnection {
  connection!: Connection;
  channel!: Channel;
  private connected!: boolean;

  async connect() {
    if (this.connected && this.channel) return;
    else this.connected = true;

    try {
      console.log(`⌛️ Connecting to Rabbit-MQ Server`);
      this.connection = await client.connect(
        `amqp://${rmqUser}:${rmqPass}@${rmqhost}:5672`
      );

      console.log(`✅ Rabbit MQ Connection is ready`);

      this.channel = await this.connection.createChannel();

      console.log(`🛸 Created RabbitMQ Channel successfully`);

      await this.startListeningToNewMessages();
    } catch (error) {
      console.error(error);
      console.error(`Not connected to MQ Server`);
    }
  }

  async startListeningToNewMessages() {
    await this.channel.assertQueue(NOTIFICATION_QUEUE, {
      durable: true,
    });

    this.channel.consume(
      NOTIFICATION_QUEUE,
      (msg) => {
        {
          if (!msg) {
            return console.error(`Invalid incoming message`);
          }

          handleIncomingNotification(msg);
          this.channel.ack(msg);
        }
      },
      {
        noAck: false,
      }
    );
  }

  async sendToQueue(queue: string, message: object) {
    try {
      if (!this.channel) {
        await this.connect();
      }

      this.channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)));
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}



const mqConnection = new RabbitMQConnection();

export default mqConnection;