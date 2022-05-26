/*
 * @Author: Lee
 * @Date: 2022-05-25 08:45:51
 * @LastEditors: Lee
 * @LastEditTime: 2022-05-26 18:46:02
 * @Description:
 */
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { configuration } from './configs';
import { StorageModule } from './shared/storage/storage.module';
import { BookModule } from './shared/book/book.module';
import { StorageService } from './shared/storage/storage.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
    }),
    StorageModule,
    BookModule,
  ],
  controllers: [AppController],
  providers: [AppService, StorageService],
})
export class AppModule {}
