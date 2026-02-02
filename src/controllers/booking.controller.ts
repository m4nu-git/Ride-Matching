import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { ApiResponse } from "../utils/api-response";
import BookingService from "../services/booking.service";
import BookingRepository from "../repositories/booking.repository";
import { Types } from "mongoose";
import { UnauthorizedError } from "../utils/errors/app.error";

const bookingService = new BookingService(new BookingRepository());

export const createBookingHandler = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { source, destination } = req.body;
  const userId = (req as any).user?.userId;
  if (!userId) {
    throw new UnauthorizedError("User not found");
  }
  const booking = await bookingService.create(
    { source, destination },
    new Types.ObjectId(userId)
  );
  res
    .status(StatusCodes.CREATED)
    .json(new ApiResponse("Booking created successfully", booking));
};