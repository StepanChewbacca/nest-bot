import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Post,
  Query,
  UseFilters,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from './user.service';
import { MessageDto } from '../dto/message.dto';
import { HttpExceptionFilter } from '../filters/http-exception.filter';
import { TransformResponseInterceptor } from '../interseptors/transform-response.interceptor';
import { User } from '../schemas/user.schema';
import { DeleteUserDto } from '../dto/delete-user.dto';
import { IUser } from '../interface/user.interface';

@Controller('users')
@UseFilters(HttpExceptionFilter)
@UseInterceptors(TransformResponseInterceptor)
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  @HttpCode(200)
  async getAllUsers(): Promise<User[]> {
    return this.userService.getAllUsers();
  }

  @Delete()
  @HttpCode(200)
  async deleteUser(@Query() deleteUser: DeleteUserDto): Promise<IUser> {
    return this.userService.deleteUser(deleteUser);
  }

  @Post('send-message')
  @HttpCode(200)
  async sendMessage(@Body() messageDto: MessageDto): Promise<string> {
    return this.userService.sendMessage(messageDto);
  }
}
