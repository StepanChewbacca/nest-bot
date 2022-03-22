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
  async catch(exception: HttpException, host: ArgumentsHost): Promise<Response> {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();

    const error = JSON.stringify({
      timestamp: new Date().toISOString(),
      path: request.url,
      exception: exception.getResponse(),
    });

    const url = encodeURI(
      `${ConfigService.getCustomKey('BOT_ERROR_LINK')}${error}`,
    );

    await axios.get(url);

    return response.status(status).json(JSON.parse(error));
  }
}
