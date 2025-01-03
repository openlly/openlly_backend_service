import jwt, { TokenExpiredError } from "jsonwebtoken";
import { appConfig } from "../appConfig";

export interface JwtPayload {
    userId: string;
    iat: number;
    exp: number;
}

const JWT_SECRET = appConfig.JWT_SECRET;

const JWT_EXPIRES_MS = Number(appConfig.JWT_EXPIRES_MS); // Access Token Expiry (e.g., 15 minutes)
const JWT_REFRESH_EXPIRES_MS = Number(appConfig.JWT_REFRESH_EXPIRES_MS); // Refresh Token Expiry (e.g., 30 days)

export const generateAccessToken = (userId: string): string => {
    const expiresIn = JWT_EXPIRES_MS;
    const payload: JwtPayload = {
        userId,
        iat: Date.now(),
        exp: Math.floor(Date.now() / 1000) + expiresIn / 1000,  // Corrected expiry time in seconds
    };
    return jwt.sign(payload, JWT_SECRET);
};

export const generateRefreshToken = (userId: string): string => {
    const expiresIn = JWT_REFRESH_EXPIRES_MS;
    const payload: JwtPayload = {
        userId,
        iat: Date.now(),
        exp: Math.floor(Date.now() / 1000) + expiresIn / 1000,  // Corrected expiry time in seconds
    };
    return jwt.sign(payload, JWT_SECRET);
};

// Function to verify Access Token
export const verifyAccessToken = (token: string): JwtPayload | null => {
    try {
        const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;
        return decoded;
    }
     catch (error) {
        console.error('Error verifying access token:', error);
        throw error
    }
};

// Function to verify Refresh Token and issue a new Access Token if valid
export const verifyRefreshToken = (token: string): JwtPayload | null => {
    try {
        const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;
        if (decoded.exp < Math.floor(Date.now() / 1000)) {
            // Refresh Token has expired
            return null;
        }
        // Refresh token is valid, return the decoded payload
        return decoded; 
    } catch (error) {
        console.error('Error verifying refresh token:', error);
        return null;
    }
};
