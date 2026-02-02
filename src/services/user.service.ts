import { CreateUserDto } from "../dto/user.dto";
import { UserDocument } from "../models/user.model";
import { IUserRepository } from "../repositories/user.repository";
import { generateToken } from "../utils/helpers/jwt.helper";

export default class UserService {
  constructor(private userRepository: IUserRepository) {}

  async signUp(user: CreateUserDto): Promise<UserDocument> {
    const existingUser = await this.userRepository.findByEmail(user.email);
    if (existingUser) {
      throw new Error("User already exists");
    }
    return this.userRepository.create(user);
  }

  async signIn(
    email: string,
    password: string
  ): Promise<{ user: UserDocument; token: string }> {
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new Error("User not found");
    }

    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      throw new Error("Invalid password");
    }
    const token = generateToken({
      userId: user._id.toString(),
      email: user.email,
      role: user.role,
    });

    return { user, token };
  }
}