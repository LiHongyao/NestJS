/*
 * @Author: Lee
 * @Date: 2022-05-25 08:45:51
 * @LastEditors: Lee
 * @LastEditTime: 2022-05-25 17:12:37
 * @Description:
 */
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getUser(id: number) {
    const users = [{ id: 1, name: 'Li-HONGYAO' }];
    const user = users.find((item) => item.id === id);
    return user || {};
  }
}
