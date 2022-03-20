import { ArgumentsHost, Catch, HttpException } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { ConfigService } from '../config/config.service';
import axios from 'axios';

@Catch()
export class TelegramExceptionsFilter extends BaseExceptionFilter {
  async catch(exception: HttpException, host: ArgumentsHost) {
    const response = host.switchToHttp().getRequest();

    const url = encodeURI(
      `${ConfigService.getCustomKey('BOT_ERROR_LINK')}${exception.message}`,
    );

    await axios.get(url);

    response.reply('Something went wrong');
  }
}
