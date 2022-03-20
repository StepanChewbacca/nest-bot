import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';

import { Request, Response } from 'express';
import axios from 'axios';
import { ConfigService } from '../config/config.service';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  async catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();

    const error = response.status(status).json({
      timestamp: new Date().toISOString(),
      path: request.url,
      exception: exception.getResponse(),
    });

    const url = encodeURI(
      `${ConfigService.getCustomKey('BOT_ERROR_LINK')}${error}`,
    );

    await axios.get(url);

    return error;
  }
}
