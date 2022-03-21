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
import { DeleteUserDto } from '../dto/delete-user.dto';
import { HttpExceptionFilter } from '../filters/http-exception.filter';
import { TransformResponseInterceptor } from '../interseptors/transform-response.interceptor';
import { IUser } from '../interface/user.interface';
import { IDeleteUser } from '../interface/detele-user.interface';

@Controller('users')
@UseFilters(HttpExceptionFilter)
@UseInterceptors(TransformResponseInterceptor)
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  @HttpCode(200)
  async getAllUsers() {
    return this.userService.getAllUsers();
  }

  @Delete()
  @HttpCode(200)
  async deleteUser(@Query() deleteUser: IDeleteUser) {
    return this.userService.deleteUser(deleteUser);
  }

  @Post('send-message')
  @HttpCode(200)
  async sendMessage(@Body() messageDto: MessageDto) {
    return this.userService.sendMessage(messageDto);
  }
}
