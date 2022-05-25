/*
 * @Author: Lee
 * @Date: 2022-05-25 08:45:51
 * @LastEditors: Lee
 * @LastEditTime: 2022-05-25 22:12:55
 * @Description:
 */
import { Controller, Get, UseInterceptors } from '@nestjs/common';
import { AppService } from './app.service';
import { HelloWorldInterceptor } from './common/interceptors/hello-world.interceptor';

@UseInterceptors(HelloWorldInterceptor)
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/todos')
  async getTodos() {
    return await this.appService.getTodos();
  }
}
