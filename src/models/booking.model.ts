import mongoose, { Schema, Types } from "mongoose";

export interface IBooking {
  passenger: Types.ObjectId;
  driver?: Types.ObjectId | null;
  source: {
    latitude: number;
    longitude: number;
  };
  destination: {
    latitude: number;
    longitude: number;
  };
  fare?: number;
  distance?: number;
  status: "pending" | "confirmed" | "completed" | "canceled";
  feedback?: string;
  rating?: number;
}

const bookingSchema = new Schema<IBooking>(
  {
    passenger: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    driver: {
      type: Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    source: {
      latitude: { type: Number, required: true },
      longitude: { type: Number, required: true },
    },
    destination: {
      latitude: { type: Number, required: true },
      longitude: { type: Number, required: true },
    },
    fare: {
      type: Number,
    },
    distance: {
      type: Number,
    },
    status: {
      type: String,
      enum: ["pending", "confirmed", "completed", "canceled"],
      default: "pending",
    },
    feedback: {
      type: String,
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
    },
  },
  { timestamps: true }
);

const Booking = mongoose.model<IBooking>("Booking", bookingSchema);
export default Booking;