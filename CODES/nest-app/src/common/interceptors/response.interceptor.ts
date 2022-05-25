/*
 * @Author: Lee
 * @Date: 2022-05-25 19:42:38
 * @LastEditors: Lee
 * @LastEditTime: 2022-05-25 19:42:49
 * @Description: 
 */
import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle();
  }
}
