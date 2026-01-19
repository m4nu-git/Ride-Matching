import { NextFunction, Request, Response } from "express";
import { ZodObject } from "zod";

/**
 *
 * @param schema - Zod Schema to validate the request Body
 * @returns - Middleware function to validate the request body
 */

export const validateRequestBody = (schema: ZodObject) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync(req.body);
      console.log("Request body is valid");
      next();
    } catch (error) {
      // If the validation fails

      res.status(400).json({
        message: "Invalid req body",
        success: false,
        error: error,
      });
    }
  };
};

export const validateQueryParams = (schema: ZodObject) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync(req.query);
      console.log("Query params are valid");
      next();
    } catch (error) {
      // If the validation fails

      res.status(400).json({
        message: "Invalid query params",
        success: false,
        error: error,
      });
    }
  };
};
