import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '../schemas/user.schema';
import { ConfigService } from '../config/config.service';
import axios from 'axios';
import { MessageDto } from '../dto/message.dto';
import { DeleteUserDto } from '../dto/delete-user.dto';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private userRepository: UserRepository,
  ) {}

  async getAllUsers(): Promise<User[]> {
    return this.userRepository.getAllUsers();
  }

  async deleteUser(deleteUserDto: DeleteUserDto) {
    return this.userRepository.deleteUser(deleteUserDto);
  }

  async sendMessage(messageDto: MessageDto): Promise<string> {
    const user = await this.userRepository.findUser(messageDto.user_id);

    const url = encodeURI(
      `${ConfigService.getCustomKey('BOT_LINK')}${user.user_id}&text=${
        messageDto.message
      }`,
    );
    await axios.get(url);
    return 'message was sent';
  }
}
