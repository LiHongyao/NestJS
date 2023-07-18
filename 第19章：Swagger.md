#  概述

如果你是一名前端工程师，那麽你应该会有跟后端要 API 文档的经验，如果你是一名后端工程师，那你应该会有写 API 文档的需求，相信很多人都不喜欢花时间在写接口文档上，甚至要为每个版本做维护，实在是耗时耗力，难道就没有其他方法来解决这个问题吗？答案是有的，解决方案就是非常知名的 [Swagger](https://swagger.io/)。

# 什么是 Swagger

![](./IMGS/20119338RloglKEMqo.png)

Swagger 是一套把 API 用视觉化方式呈现的工具，简单来说，就是会产生一个页面将各个 API 条列出来，包含了 API 所需的参数以及参数格式等，甚至可以通过这个页面直接对后端的 API 做操作，达到了 Postman 的效果，大幅降低 API 文件的维护成本，更可以促进前后端的开发效率。

# 使用 Swagger

## 安装依赖

```shell
$ npm install --save @nestjs/swagger swagger-ui-express
```

## 配置

**`src/swaggers/index.ts`**

```typescript
import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export const setupSwagger = (app: INestApplication) => {
  const swaggerOptions = new DocumentBuilder()
    .setTitle('荣发装饰·接口文档')
    .addTag('APIs', '天道酬勤')
    .setDescription('Swagger-ui Apis.')
    .setVersion('1.0')
    .setLicense('Apache 2.0', 'https://www.apache.org/licenses/LICENSE-2.0')
    .addServer('http://localhost:3000', '开发环境服务')
    .addServer('http://localhost:8888', '测试环境服务')
    .addBearerAuth({ type: 'http', scheme: 'bearer', bearerFormat: 'JWT' }, 'jwt')
    .setContact('李鴻耀同學', 'https://github.com/lihongyao', 'lihy_online@163.com')
    .build();
  const document = SwaggerModule.createDocument(app, swaggerOptions, { ignoreGlobalPrefix: false });
  SwaggerModule.setup('api/docs', app, document);
};
```

**`src/main.ts`**

```typescript
setupSwagger(app);
```

## 示例

- `ApiTags('控制器分组名')`:
- `@ApiOperation({ summary: '接口名' })`
- `@ApiQuery({ name: 'id', description: '查询索引', type: Number, example: 1, required: false })`

- `@ApiParam({ name: 'id', description: '更新索引', type: Number, example: 1 })`
- `@ApiProperty({ name: 'age', description: 'age', type: Number })`

> **！提示**：关于 swagger 的更多内容，请参考 [这里 >>](https://docs.nestjs.cn/9/openapi)
