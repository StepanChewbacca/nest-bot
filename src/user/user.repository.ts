import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { User, UserDocument } from '../schemas/user.schema';
import { ICreateUser } from '../interface/create-user.interface';
import { IDeleteUser } from '../interface/detele-user.interface';

@Injectable()
export class UserRepository {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async createUser(user: ICreateUser): Promise<UserDocument> {
    return new this.userModel(user).save();
  }

  async getAllUsers(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async deleteUser(user: IDeleteUser) {
    return this.userModel.deleteOne(user);
  }

  async findUser(user_id: number): Promise<User> {
    return this.userModel.findOne({ id: user_id }).exec();
  }
}
