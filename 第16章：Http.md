# 概述

很多时候我们会需要去请求第三方的 API，这时候如果第三方没有提供相关的 SDK 让我们使用的话，就必须自己用 HTTP Request 去请求对应的数据，早期的 node.js 开发人员可能会使用 request 来实现，但该函数库现在已经被弃用了，取而代之的是 node-fetch 或 axios，而 Nest 内建了 HTTP Module，它是基于 axios 进行包装的模块，让 Nest 开发人员不必为使用哪个套件烦恼，HTTP Module 即装即用！

# 使用 HTTP Module

HTTP Module 的 `class` 名称为 `HttpModule`，它导出了一个 `HttpService` 的 Service，其提供 `axios` 的方法来处理 HTTP 请求，并且使用 `Observable` 的形式。

> **！注意**：想要知道 `axios` 具体有哪些方法可以查看[官方說明](https://github.com/axios/axios#instance-methods)。

安装 `@nestjs/axios`

```shell
$ npm i --save @nestjs/axios
```

以 `app.module.ts` 为例，将 `HttpModule` 导入：

```typescript
import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [HttpModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
```

然后定义一个接口用于约束（接受）请求的资源

```shell
$ nest g interface common/interfaces/todo
```

```typescript
export interface Todo {
  userId: number;
  id: number;
  title: string;
  body: string;
}
```

这里我们借用一下 [JSONPlaceholder](http://jsonplaceholder.typicode.com/) 作为第三方API，并使用 `todos` 资源。

调整一下 `app.service.ts` 的内容，通过 `getTodos` 方法去取得 todos 的资源：

```typescript
import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { Todo } from './common/interfaces/todo.interface';

@Injectable()
export class AppService {
  // -- 注入httpService
  constructor(private readonly http: HttpService) {}

  async getTodos(): Promise<Observable<Todo>> {
    // -- 调用get请求
    return await this.http
      .get('https://jsonplaceholder.typicode.com/posts')
      .pipe(map((resp) => resp.data));
  }
}
```

调整 `app.controller.ts`，在 `getTodos` 中调用 `AppService` 的 `getTodos`：

```typescript
import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/todos')
  async getTodos() {
    return await this.appService.getTodos();
  }
}

```

最后在浏览器访问 http://localhost:3000/todos 验证结果...

# 配置 axios

`HttpModule` 提供 `register` 方法让我们可以去定制 `axios`，具体可参考 [axios/request-config >>](https://github.com/axios/axios#request-config[)

我们以 `app.module.ts` 为例：

```typescript
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
```

这里我们配置了 `baseURL`，那么当我们请求第三方接口时，就可以不用写前缀了，只需要写请求 `path` 即可，如：

```typescript
import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { Todo } from './common/interfaces/todo.interface';

@Injectable()
export class AppService {
  // -- 注入httpService
  constructor(private readonly http: HttpService) {}

  async getTodos(): Promise<Observable<Todo>> {
    // -- 调用get请求
    return await this.http.get('/posts').pipe(map((resp) => resp.data));
  }
}
```

在浏览器访问 http://localhost:3000/todos 验证结果...

# 使用环境变量

`HttpModule` 有提供 `registerAsync` 方法，通过这个方法可以注入 `ConfigService` 获取环境变量：

```typescript
import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    HttpModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => ({
        baseURL: config.get('BASE_URL'),
        timeout: 20 * 1000,
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
```

