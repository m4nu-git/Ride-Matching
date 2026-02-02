import { z } from "zod";

const createUserSchema = z.object({
    name: z.string().min(1),
    email: z.string().email(),
    password: z.string().min(8),
    role: z.enum(["driver", "passenger"]),
})

const signInSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8),
})

export { createUserSchema, signInSchema }