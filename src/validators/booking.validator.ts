import { z } from "zod";

const createBookingSchema = z.object({
    source: z.object({
        latitude: z.number(),
        longitude: z.number()
    }),
    destination: z.object({
        latitude: z.number(),
        longitude: z.number(),
    })
});


export { createBookingSchema }