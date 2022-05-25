## 环境配置（变量）

### 安装依赖

```shell
$ npm i --save @nestjs/config
$ npm i --save-dev cross-env
```

> **Tips：**由于 windows 平台不支持 *`NODE_ENV=development`* 方式，所以需要 *`cross-env`* 依赖兼容。

### 根目录下创建 `.env` 文件

```ini
# app configs

APP_PORT=8888
APP_PREFIX=/api

# https://jwt.io/introduction

JWT_SECRET=JWT_1652083308472
```

> **Tips：** 在这里你可以定义一些固定通用的常量。

为了使得程序能够自动识别你定义的环境变量，你可以构建全局类型声明文件：*`typings/global.d.ts`*

```typescript
export declare global {
  namespace NodeJS {
    interface ProcessEnv {
      APP_PORT: string;
      APP_PREFIX: string;
      JWT_SECRET: string;
    }
  }
}
```

这样你在使用时，如 `process.env.APP_PORT` 即可获得类型提示。

### 自定义配置文件 *

一般来讲，可能 `.env` 文件能够满足你的需求，但如果你的项目过于复杂，可以利用自定义配置文件来满足需求。

> **Tips：** 实际使用中，你可以直接使用自定义配置文件应用于你的项目中。

首先构造如下目录结构：

```
src
 - configs
 	- envs 		           # 配置文件
 		- default.ts       # 默认配置文件/这里的配置将会和各环境配置文件进行合并
 		- development.ts   # 开发环境
 		- production.ts    # 生成环境
 		- test.ts          # 测试环境
    - config.interface.ts  # 类型定义
    - configuration.ts     # 自定义配置文件
    - index.ts             # 统一导出
```

接下来我们来看看各文件下的具体内容：

*`src/configs/envs/default.ts`*

```typescript
// -- 默认配置
export const config = {
  app: {
    port: 8888,
    prefix: '/api',
  },
  jwt: {
    secretkey: 'JWT_1652083308472',
  },
};
```

*`src/configs/envs/development.ts`*

```typescript
export const config = {
  env: 'dev',
};
```

*`src/configs/envs/production.ts`*

```typescript
export const config = {
  env: 'pro',
};
```

*`src/configs/envs/test.ts`*

```typescript
export const config = {
  env: 'test',
};
```

*`src/configs/interface.d.ts`*

```typescript
import type { config as base } from './envs/default';
import type { config as dev } from './envs/production';
import type { config as pro } from './envs/development';
import type { config as test } from './envs/test';

export type Objectype = Record<string, unknown>;
export type Default = typeof base;
export type Development = typeof dev;
export type Production = typeof pro;
export type Test = typeof test;
export type Config = Default & Development & Production & Test;
```

*`src/configs/configuration.ts`*

```typescript
import type { Objectype, Config } from './config.interface';
const util = {
  // -- 校验是否为对象
  isObject<T>(value: T): value is T & Objectype {
    return value !== null && typeof value === 'object' && !Array.isArray(value);
  },
  // -- 执行合并
  merge<T extends Objectype, U extends Objectype>(target: T, source: U): T & U {
    for (const key of Object.keys(source)) {
      const targetValue = target[key];
      const sourceValue = source[key];
      if (this.isObject(targetValue) && this.isObject(sourceValue)) {
        Object.assign(sourceValue, this.merge(targetValue, sourceValue));
      }
    }
    return { ...target, ...source };
  },
};

export const configuration = async (): Promise<Config> => {
  // -- 导入默认配置
  const { config } = await import('./envs/default');
  // -- 根据当前环境（process.env.NODE_ENV）加载对应的配置文件，默认为 development 环境
  const { config: environment } = <{ config: Config }>await import(`./envs/${process.env.NODE_ENV || 'development'}`);
  // -- 执行合并，并导出
  return util.merge(config, environment);
};
```

*`src/configs/index.ts`*

```typescript
export * from './config.interface';
export * from './configuration';
```

### 导入使用

前期准备工作完成之后，我们需要导入`ConfigModule`模块。通常，我们在根模块`AppModule`中导入它，并使用`.forRoot()`静态方法导入它的配置。

```typescript
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { configuration } from './configs';

@Module({
  imports: [
    // -- 配置模块
    ConfigModule.forRoot({
      cache: true,
      isGlobal: true,
      load: [configuration],
    })
  ],
  controllers: [],
})
export class AppModule {}
```

现在您可以简单地在任何地方注入 `ConfigService` ，并根据传递的密钥检索特定的配置值

```typescript
import { Injectable } from '@nestjs/common';
import { IResponse } from 'src/common/interfaces/response.interface';
import { ConfigService } from '@nestjs/config';
@Injectable()
export class HelloService {
  constructor(private configService: ConfigService /** 注入configService  */) {}
  async testEnv(): Promise<IResponse> {
    // -- 读取环境变量并返回
    return { code: 0, data: this.configService.get('jwtSecret') };
  }
}
```

最后，我们修改下 `package.json` 文件中的执行指令，你可以根据环境来设定：

```json
{
    "start:dev": "cross-env NODE_ENV=development nest start --watch",
    "start:prod": "cross-env NODE_ENV=production node dist/main",
    "start:test": "cross-env NODE_ENV=test node dist/main",
}
```

