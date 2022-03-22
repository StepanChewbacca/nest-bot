import { Injectable, NotFoundException } from '@nestjs/common';
import axios from 'axios';
import { User } from '../schemas/user.schema';
import { ConfigService } from '../config/config.service';
import { UserRepository } from './user.repository';
import { IDeleteUser } from '../interface/detele-user.interface';
import { IMessage } from '../interface/message.interface';
import { IUser } from '../interface/user.interface';

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) {}

  async getAllUsers(): Promise<User[]> {
    return this.userRepository.getAllUsers();
  }

  async deleteUser(user: IDeleteUser): Promise<IUser> {
    const deletedUser = await this.userRepository.deleteUser(user);

    if (!deletedUser) {
      throw new NotFoundException('user not found');
    }

    return deletedUser;
  }

  async sendMessage(message: IMessage): Promise<string> {
    const user = await this.userRepository.findUser(message.chat_id);

    if (!user) {
      throw new NotFoundException('user not found');
    }

    const url = encodeURI(
      `${ConfigService.getCustomKey('BOT_LINK')}${user.chat_id}&text=${
        message.message
      }`,
    );

    await axios.get(url);

    return 'message was sent';
  }
}
