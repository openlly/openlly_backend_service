import pino from "pino";
import pinoPretty from "pino-pretty";

const logger = pino(
    {
        transport: {
            target: 'pino-pretty',
            options: {
                colorize: true,
                ignore: 'pid,hostname'
            }
        }
    },
    pinoPretty({
        colorize: true,
        ignore: 'pid,hostname'
    })
);




export default logger;