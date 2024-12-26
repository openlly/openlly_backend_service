import dotenv from 'dotenv';
dotenv.config();    
export const appConfig = {
    JWT_SECRET: process.env.JWT_SECRET || '12345678123456781234567812345678',
    JWT_EXPIRES_MS: Number(process.env.JWT_EXPIRES_MS) || 86400000,
    BASE_URL: process.env.BASE_URL || 'http://localhost:3000',
    DATABASE_URL: process.env.DATABASE_URL || 'postgres://postgres:postgres@localhost:5432/postgres',
    REDIS_URL: process.env.REDIS_URL || 'redis://localhost:6379',
    NODE_ENV: process.env.NODE_ENV || 'development',
    PORT: process.env.PORT || 3000,
    GROQ_API_KEY: process.env.GROQ_API_KEY
};

