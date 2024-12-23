import jwt from "jsonwebtoken";
import { config } from "dotenv";
config();

interface JwtPayload {
    userId: string;
    iat: number;
    exp: number;
}

const JWT_SECRET = process.env.JWT_SECRET || 'secret';

const JWT_EXPIRES_MS = Number(process.env.JWT_EXPIRES_MS || '86400000');

export const generateToken = (userId: string): string => {
    const expiresIn = JWT_EXPIRES_MS;
    const payload: JwtPayload = {
        userId,
        iat: Date.now(),
        exp: Date.now() + expiresIn,
    };
    return jwt.sign(payload, JWT_SECRET);
};

export const verifyToken = (token: string): JwtPayload | null => {
    try {
        const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;
        if (decoded.exp < Date.now() / 1000) {
            return null;
        }
        return decoded;
    } catch (error) {
        console.error('Error verifying token:', error);
        return null;
    }
};