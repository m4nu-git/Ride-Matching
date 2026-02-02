import { IBooking } from "../models/booking.model";
import { Types } from "mongoose";
import { haversineDistance } from "../utils/distance";
import { CreateBookingDto } from "../dto/booking.dto";
import { IBookingRepository } from "../repositories/booking.repository";
import { BadRequestError } from "../utils/errors/app.error";

export interface IBookingService {
  create(booking: CreateBookingDto, userId: Types.ObjectId): Promise<IBooking>;
}

export default class BookingService implements IBookingService {
  private readonly BASIC_FARE = 50;
  private readonly RATE_PER_KM = 12;
  constructor(private bookingRepository: IBookingRepository) {}
  async create(
    booking: CreateBookingDto,
    userId: Types.ObjectId
  ): Promise<IBooking> {
    const distance = haversineDistance(
      booking.source.latitude,
      booking.source.longitude,
      booking.destination.latitude,
      booking.destination.longitude
    );
    const fare = this.BASIC_FARE * (distance * this.RATE_PER_KM);

    const bookingData: IBooking = {
      passenger: userId,
      source: booking.source,
      destination: booking.destination,
      fare,
      distance,
      status: "pending",
    };
    const newBooking = await this.bookingRepository.create(bookingData, userId);
    if (!newBooking) {
      throw new BadRequestError("Failed to create booking");
    }
    return newBooking;
  }
}