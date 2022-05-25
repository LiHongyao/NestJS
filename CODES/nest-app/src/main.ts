/*
 * @Author: Lee
 * @Date: 2022-05-25 08:45:51
 * @LastEditors: Lee
 * @LastEditTime: 2022-05-25 22:15:22
 * @Description:
 */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HelloWorldInterceptor } from './common/interceptors/hello-world.interceptor';
import { LoggerMiddleware } from './common/middlewares/logger.middleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  HelloWorldInterceptor
  await app.listen(3000);
}
bootstrap();
