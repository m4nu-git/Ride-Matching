import { NextFunction, Request, Response } from "express";
import logger from "../config/logger.config";

export const pingHandler = (req: Request, res: Response, next: NextFunction) => {
    logger.info(`Ping request Received!`)
    res.status(200).json({ message: "pong!" });
};
