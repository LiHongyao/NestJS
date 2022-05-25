/*
 * @Author: Lee
 * @Date: 2022-05-25 16:11:57
 * @LastEditors: Lee
 * @LastEditTime: 2022-05-25 16:12:05
 * @Description:
 */
import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter<HttpException> {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();
    const message = exception.message;
    const timestamp = new Date().toISOString();

    const responseObject = {
      code: status,
      message,
      timestamp,
    };
    response.status(status).json(responseObject);
  }
}
