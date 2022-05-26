/*
 * @Author: Lee
 * @Date: 2022-05-26 18:45:21
 * @LastEditors: Lee
 * @LastEditTime: 2022-05-26 18:48:33
 * @Description: 
 */
import { Module } from '@nestjs/common';
import { StorageModule } from '../storage/storage.module';
import { BookService } from './book.service';

@Module({
  imports: [StorageModule],
  providers: [BookService],
  exports: [BookService],
})
export class BookModule {}
