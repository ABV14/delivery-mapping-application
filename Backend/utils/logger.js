import winston from 'winston';
import dotenv from 'dotenv';

dotenv.config();

// Define logging levels and colors
const logger = winston.createLogger({
    level: process.env.NODE_ENV === 'development' ? 'debug' : 'info',
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.printf(({ timestamp, level, message }) => {
            return `${timestamp} [${level.toUpperCase()}]: ${message}`;
        })
    ),
    transports: [
        new winston.transports.Console({ format: winston.format.simple() }), // Logs to console
        new winston.transports.File({ filename: 'logs/app.log' }) // Logs to a file
    ]
});

export default logger;
