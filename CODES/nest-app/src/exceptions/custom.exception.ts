/*
 * @Author: Lee
 * @Date: 2022-05-25 15:52:05
 * @LastEditors: Lee
 * @LastEditTime: 2022-05-25 15:53:17
 * @Description:
 */
import { HttpException, HttpStatus } from '@nestjs/common';

export class CustomException extends HttpException {
  constructor() {
    super('未知的錯誤', HttpStatus.INTERNAL_SERVER_ERROR);
  }
}
