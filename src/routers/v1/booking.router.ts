import { Router } from "express";
import { createBookingHandler } from "../../controllers/booking.controller";
import { validateRequestBody } from "../../validators";
import { createBookingSchema } from "../../validators/booking.validator";
import { authMiddleware } from "../../middlewares/auth.middleware";

const bookingRouter = Router();

bookingRouter.post(
  "/",
  authMiddleware,
  validateRequestBody(createBookingSchema),
  createBookingHandler
);

export default bookingRouter;