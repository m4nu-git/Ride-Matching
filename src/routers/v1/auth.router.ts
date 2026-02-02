import { Router } from "express";
import {
  signInHandler,
  signUpHandler,
} from "../../controllers/user.controller";
import { validateRequestBody } from "../../validators";
import {
  createUserSchema,
  signInSchema,
} from "../../validators/user.validator";

const authRouter = Router();

authRouter.post(
  "/signup",
  validateRequestBody(createUserSchema),
  signUpHandler
);
authRouter.post("/signin", validateRequestBody(signInSchema), signInHandler);

export default authRouter;