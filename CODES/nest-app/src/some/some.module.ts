/*
 * @Author: Lee
 * @Date: 2022-05-25 14:14:47
 * @LastEditors: Lee
 * @LastEditTime: 2022-05-25 14:27:48
 * @Description:
 */
import { Module } from '@nestjs/common';

const SOME_A = {
  provide: 'ASYNC_PROVIDE',
  useFactory: async () => {
    const infos = new Promise((resolve) => {
      setTimeout(() => resolve({ name: 'Li-HONGYAO', loc: '成都' }), 2000);
    });
    return await infos;
  },
};

@Module({
  providers: [SOME_A],
  exports: [SOME_A],
})
export class SomeModule {}
