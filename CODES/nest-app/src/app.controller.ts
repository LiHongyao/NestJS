/*
 * @Author: Lee
 * @Date: 2022-05-25 08:45:51
 * @LastEditors: Lee
 * @LastEditTime: 2022-05-25 17:52:02
 * @Description:
 */
import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';
import { ParseIntPipe } from './common/pipes/parse-int.pipe';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get(':id')
  getUser(@Param('id', ParseIntPipe) id: number) {
    return this.appService.getUser(id);
  }
}
