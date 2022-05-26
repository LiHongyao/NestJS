/*
 * @Author: Lee
 * @Date: 2022-05-26 18:44:59
 * @LastEditors: Lee
 * @LastEditTime: 2022-05-26 18:47:32
 * @Description: 
 */
import { Module } from '@nestjs/common';
import { StorageService } from './storage.service';

@Module({
  providers: [StorageService],
  exports: [StorageService],
})
export class StorageModule {}
