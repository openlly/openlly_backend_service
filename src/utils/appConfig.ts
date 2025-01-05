import dotenv from 'dotenv';
dotenv.config();    


export const appConfig = {
    JWT_SECRET: process.env.JWT_SECRET || '12345678123456781234567812345678',
    JWT_EXPIRES_MS: Number(process.env.JWT_EXPIRES_MS) || 86400000,
    BASE_URL: process.env.BASE_URL || 'http://localhost:3000',
    DATABASE_URL: process.env.DATABASE_URL || 'postgres://postgres:postgres@localhost:5432/postgres',
    NODE_ENV: process.env.NODE_ENV || 'development',
    APP_PORT: process.env.APP_PORT || 3000,
    GROQ_API_KEY: process.env.GROQ_API_KEY,
    CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
    CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
    CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,
    CLOUDINARY_URL: process.env.CLOUDINARY_URL,
    APP_CLIENT_URL : process.env.APP_CLIENT_URL,
    REDIS_HOST: process.env.REDIS_HOST,
    REDIS_PORT: process.env.REDIS_PORT,
    SMTP_HOST: process.env.SMTP_HOST,
    SMTP_PORT: Number(process.env.SMTP_PORT),
    SMTP_USER: process.env.SMTP_USER,
    SMTP_PASS: process.env.SMTP_PASS,
    SMTP_FROM: process.env.SMTP_FROM,
    MAGIC_LINK_TTL : Number(process.env.MAGIC_LINK_TTL),
    ADMIN_EMAIL : process.env.ADMIN_EMAIL,
    RMQ_URL : String(process.env.RABBITMQ_URL),
    JWT_REFRESH_EXPIRES_MS: Number(process.env.JWT_REFRESH_EXPIRES_MS) || 86400000

}

enum Environment {
    Development = 'development',
    Production = 'production',
    Test = 'test',
    Local = 'local'
}

export const isDevEnv = appConfig.NODE_ENV === Environment.Development || appConfig.NODE_ENV === Environment.Local;

