import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { ApiResponse } from "../utils/api-response";
import UserService from "../services/user.service";
import UserRepository from "../repositories/user.repository";

const userService = new UserService(new UserRepository());

export const signUpHandler = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { name, email, password, role } = req.body;
  const user = await userService.signUp({ name, email, password, role });
  res
    .status(StatusCodes.CREATED)
    .json(new ApiResponse("User created successfully", user));
};

export const signInHandler = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { email, password } = req.body;
  const user = await userService.signIn(email, password);
  res
    .status(StatusCodes.OK)
    .json(new ApiResponse("User signed in successfully", user));
};