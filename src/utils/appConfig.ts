import dotenv from 'dotenv';
dotenv.config();


export const appConfig = {
    JWT_SECRET: process.env.JWT_SECRET || '12345678123456781234567812345678',
    JWT_EXPIRES_MS: Number(process.env.JWT_EXPIRES_MS) || 86400000,
    BASE_URL: process.env.BASE_URL || 'http://localhost:3000',
    DATABASE_URL: process.env.DATABASE_URL || 'postgres://postgres:postgres@localhost:5432/postgres',
    NODE_ENV: process.env.NODE_ENV || 'development',
    APP_PORT: process.env.APP_PORT || 3000,
    CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
    CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
    CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,
    CLOUDINARY_URL: process.env.CLOUDINARY_URL,
    APP_CLIENT_URL: process.env.APP_CLIENT_URL,
    REDIS_HOST: process.env.REDIS_HOST,
    REDIS_PORT: process.env.REDIS_PORT,
    SMTP_HOST: process.env.SMTP_HOST,
    SMTP_PORT: Number(process.env.SMTP_PORT),
    SMTP_USER: process.env.SMTP_USER,
    SMTP_PASS: process.env.SMTP_PASS,
    SMTP_FROM: process.env.SMTP_FROM,
    MAGIC_LINK_TTL: Number(process.env.MAGIC_LINK_TTL),
    ADMIN_EMAIL: process.env.ADMIN_EMAIL,
    RMQ_URL: String(process.env.RABBITMQ_URL),
    JWT_REFRESH_EXPIRES_MS: Number(process.env.JWT_REFRESH_EXPIRES_MS) || 86400000,
    OPENAI_API_KEY: process.env.OPENAI_API_KEY || '',
    OPENAI_API_BASE_URL: process.env.OPENAI_API_BASE_URL || 'https://api.groq.com/openai/v1',
    OPENAI_MODEL: process.env.OPENAI_MODEL || 'llama3-8b-8192',
}
export const FirebaseAppConfig={
    "type": process.env.FIREBASE_TYPE,
    "project_id": process.env.FIREBASE_PROJECT_ID,
    "private_key_id": process.env.FIREBASE_PRIVATE_KEY_ID,
    "private_key": process.env.FIREBASE_PRIVATE_KEY,
    "client_email": process.env.FIREBASE_CLIENT_EMAIL,
    "client_id": process.env.FIREBASE_CLIENT_ID,
    "auth_uri": process.env.FIREBASE_AUTH_URI,
    "token_uri": process.env.FIREBASE_TOKEN_URI,    
    "auth_provider_x509_cert_url": process.env.FIREBASE_AUTH_PROVIDER_X509_CERT_URL,
    "client_x509_cert_url": process.env.FIREBASE_CLIENT_X509_CERT_URL,
    "universe_domain": process.env.FIREBASE_UNIVERSE_DOMAIN
}

enum Environment {
    Development = 'development',
    Production = 'production',
    Test = 'test',
    Local = 'local'
}

export const isDevEnv = appConfig.NODE_ENV === Environment.Development || appConfig.NODE_ENV === Environment.Local;

