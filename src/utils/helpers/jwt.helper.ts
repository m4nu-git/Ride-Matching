import jwt from "jsonwebtoken";
import { serverConfig } from "../../config";

export interface IJwtPayload {
    userId: string;
    email: string;
    role: "driver" | "passenger";
}

export const generateToken = (payload: IJwtPayload) => {
    return jwt.sign(payload, serverConfig.JWT_SECRET, {
        expiresIn: serverConfig.JWT_EXPIRY
    })
};

export const verifyToken = (token: string): IJwtPayload => {
    return jwt.verify(token, serverConfig.JWT_SECRET) as IJwtPayload
}