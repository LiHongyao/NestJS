/*
 * @Author: Lee
 * @Date: 2022-05-25 18:04:42
 * @LastEditors: Lee
 * @LastEditTime: 2022-05-25 18:05:05
 * @Description: 
 */
import { Module } from '@nestjs/common';
import { TodoController } from './todo.controller';

@Module({
  controllers: [TodoController],
})
export class TodoModule {}
