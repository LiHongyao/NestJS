/*
 * @Author: Lee
 * @Date: 2022-05-25 18:04:57
 * @LastEditors: Lee
 * @LastEditTime: 2022-05-25 18:40:55
 * @Description:
 */
import { Controller, Get, Param, UsePipes, ValidationPipe } from '@nestjs/common';

@Controller('todos')
export class TodoController {

  @Get(':id')
  @UsePipes(new ValidationPipe({ transform: true }))
  get(@Param('id')id : number) {
    console.log(typeof id);
    return '';
  }
}
