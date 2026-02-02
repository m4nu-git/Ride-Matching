import { NextFunction, Request, Response } from "express";
import { IJwtPayload, verifyToken } from "../utils/helpers/jwt.helper";
import { UnauthorizedError } from "../utils/errors/app.error";



export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      throw new UnauthorizedError("Token is required");
    }
    const decoded = verifyToken(token);
    req.user = decoded;
    next();
  } catch (error) {
    next(error);
  }
};