/*
 * @Author: Lee
 * @Date: 2022-05-25 08:45:51
 * @LastEditors: Lee
 * @LastEditTime: 2022-05-25 21:42:46
 * @Description: 
 */
import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    // -- 配置axios
    HttpModule.register({
      baseURL: 'https://jsonplaceholder.typicode.com',
      timeout: 20 * 1000,
      headers: { 'X-Custom-Header': 'foobar' },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
