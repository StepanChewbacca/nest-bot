import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { IResponse } from '../interface/response.interface';

@Injectable()
export class TransformResponseInterceptor<T>
implements NestInterceptor<T, IResponse<T>> {
  intercept(
    context: ExecutionContext,
    next: CallHandler<T>,
  ): Observable<IResponse<T>> | Promise<Observable<IResponse<T>>> {
    return next.handle().pipe(map((data) => ({ data })));
  }
}
