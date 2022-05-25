# 什么是拦截器？

受面向切面编程（AOP）技术的启发，为原功能扩展逻辑，其特点如下：

- 在函数执行之前/之后绑定**额外的逻辑**
- 转换从函数返回的结果
- **转换**从函数抛出的异常
- 扩展基本函数行为
- 根据所选条件完全重写函数 (例如, 缓存目的)

![](./IMGS/201193386hVCd5hrJj.png)

> **！提示**：拦截器是使用 `@Injectable()` 装饰器注解的类。拦截器应该实现 `NestInterceptor` 接口。

# 创建 Interceptor

Interceptor 可以通过 CLI 创建：

```shell
$ nest generate interceptor <INTERCEPTOR_NAME>
```

> **！注意**：`<INTERCEPTOR_NAME>` 可以含有路径，如：`common/interceptors/hello-world`，這樣就會在 `src` 目录下建立该路径并含有 Interceptor。

```shell
$ nest g in common/interceptors/hello-world
```

生成文件的基本结构如下：

```typescript
import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class HelloWorldInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle();
  }
}
```

可以发现，拦截器其实也是带有 `@Injectable` 装饰器的 `class`，不过它必须实现 `NestInterceptor` 接口，并设计 `intercept(context: ExecutionContext, next: CallHandler)` 方法。 

## 调用处理程序 CallHandler

`CallHandler` 为 `Interceptor` 的重要成员，它实现了 `handle()` 方法，如果不手动调用 `handle()` 方法，则主处理程序根本不会进行求值。

## 执行上下文 ExecutionContext

`ExecutionContext` 是继承 `ArgumentsHost` 的 `class`，其提供了更多关于此请求的相关讯息，下方为它提供的两个方法，通过这两个方法可以大幅提升应用的灵活性：

### getClass

### getHandler

# 使用 Interceptor

在使用之前，先将 `hello-world.interceptor.ts` 修改一下，在进入 Interceptor 时印出 `Hello World!` 并使用变量储存进入的时间，再通过 tap 输出结束的时间与进入的时间差：

```typescript
import {  CallHandler,  ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class HelloWorldInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    // -- 输出
    console.log('Hello World!');
    // -- 记录进入的时间
    const input = Date.now();
    // -- 输出时间差
    return next
      .handle()
      .pipe(tap(() => console.log(`${Date.now() - input} ms`)));
  }
}
```

## 局部使用

你可以在某个 **路由** 或 直接在某个 **控制器** 上通过 `@UseInterceptors` 使用拦截器。比如：

```typescript
import { Controller, Get, UseInterceptors } from '@nestjs/common';
import { AppService } from './app.service';
import { HelloWorldInterceptor } from './common/interceptors/hello-world.interceptor';

@Controller()
@UseInterceptors(HelloWorldInterceptor)
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
```

浏览器查看 [http://localhost:3000](http://localhost:3000/) ，终端输出如下内容：

```
Hello World!
647 ms
```

## 全局使用

```typescript
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HelloWorldInterceptor } from './common/interceptors/hello-world.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalInterceptors(new HelloWorldInterceptor());
  await app.listen(3000);
}
bootstrap();
```

# 拓展：响应拦截器

生成环境中，我们可以通过自定义响应拦截器来组装响应给客户端的数据格式，如下：

```shell
$ nest g in common/interceptors/response
```

```typescript
import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IResponse } from '../interfaces/response.interface';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<IResponse> {
    // 实现数据的遍历与转变
    return next.handle().pipe(
      map((response: IResponse) => {
        const { code, msg, data, page } = response;
        return {
          code: code || 0,
          data: data || null,
          msg: msg || 'success',
          page,
        };
      }),
    );
  }
}
```

```typescript
app.useGlobalInterceptors(new ResponseInterceptor());
```



