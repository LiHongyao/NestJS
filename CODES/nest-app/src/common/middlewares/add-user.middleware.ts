/*
 * @Author: Lee
 * @Date: 2022-05-26 12:19:05
 * @LastEditors: Lee
 * @LastEditTime: 2022-05-26 12:52:46
 * @Description:
 */
import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class AddUserMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    req.user = { name: '耀哥', roles: ['staff'] };
    next();
  }
}
