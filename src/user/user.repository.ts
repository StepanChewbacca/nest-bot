import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { User, UserDocument } from '../schemas/user.schema';
import { ICreateUser } from '../interface/create-user.interface';
import { IDeleteUser } from '../interface/detele-user.interface';
import { IUser } from '../interface/user.interface';

@Injectable()
export class UserRepository {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async createUser(user: ICreateUser): Promise<void> {
    await new this.userModel(user).save();
  }

  async getAllUsers(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async deleteUser(user: IDeleteUser): Promise<IUser> {
    return this.userModel.findOneAndDelete(user);
  }

  async findUser(chat_id: number): Promise<IUser> {
    return this.userModel.findOne({ chat_id }).exec();
  }
}
