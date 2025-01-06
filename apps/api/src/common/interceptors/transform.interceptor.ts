import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';

import {
  RESPONSE_SUCCESS_CODE,
  RESPONSE_SUCCESS_MSG,
} from '../constants/response';

@Injectable()
export class TransformInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        return {
          code: RESPONSE_SUCCESS_CODE,
          data,
          message: RESPONSE_SUCCESS_MSG,
        };
      }),
    );
  }
}
