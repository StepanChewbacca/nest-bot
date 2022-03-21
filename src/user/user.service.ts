import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { User } from '../schemas/user.schema';
import { ConfigService } from '../config/config.service';
import { UserRepository } from './user.repository';
import { IDeleteUser } from '../interface/detele-user.interface';
import { IMessage } from '../interface/message.interface';

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) {}

  async getAllUsers(): Promise<User[]> {
    return this.userRepository.getAllUsers();
  }

  async deleteUser(user: IDeleteUser): Promise<User> {
    return this.userRepository.deleteUser(user);
  }

  async sendMessage(message: IMessage): Promise<string> {
    const user = await this.userRepository.findUser(message.user_id);

    const url = encodeURI(
      `${ConfigService.getCustomKey('BOT_LINK')}${user.user_id}&text=${
        message.message
      }`,
    );

    await axios.get(url);

    return 'message was sent';
  }
}
