import { CreateUserDto } from "../dto/user.dto";
import User, { UserDocument } from "../models/user.model";

export interface IUserRepository {
  create(user: CreateUserDto): Promise<UserDocument>;
  findByEmail(email: string): Promise<UserDocument | null>;
}

export default class UserRepository implements IUserRepository {
  async create(user: CreateUserDto): Promise<UserDocument> {
    return User.create(user);
  }

  async findByEmail(email: string): Promise<UserDocument | null> {
    return User.findOne({ email });
  }
}