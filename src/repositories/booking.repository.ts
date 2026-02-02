import Booking from "../models/booking.model";
import { IBooking } from "../models/booking.model";
import { Types } from "mongoose";

export interface IBookingRepository {
  create(booking: IBooking, userId: Types.ObjectId): Promise<IBooking>;
}

export default class BookingRepository implements IBookingRepository {
  async create(booking: IBooking, userId: Types.ObjectId): Promise<IBooking> {
    return Booking.create({
      passenger: userId,
      source: booking.source,
      destination: booking.destination,
      fare: booking.fare,
      distance: booking.distance,
    });
  }
}