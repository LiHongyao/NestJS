/*
 * @Author: Lee
 * @Date: 2022-05-26 12:11:19
 * @LastEditors: Lee
 * @LastEditTime: 2022-05-26 12:28:28
 * @Description:
 */
import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const User = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const user = request.user;
    return data ? user[data] : user;
  },
);
