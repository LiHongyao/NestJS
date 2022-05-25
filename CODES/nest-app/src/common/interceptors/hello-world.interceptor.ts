/*
 * @Author: Lee
 * @Date: 2022-05-25 21:56:20
 * @LastEditors: Lee
 * @LastEditTime: 2022-05-25 22:12:44
 * @Description:
 */
import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class HelloWorldInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    // -- 输出
    console.log('Hello World!');
    // -- 记录进入的时间
    const input = Date.now();
    // -- 输出时间差
    return next
      .handle()
      .pipe(tap(() => console.log(`${Date.now() - input} ms`)));
  }
}
