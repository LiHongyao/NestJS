# 前言

近年来，[Node.js](https://nodejs.org/zh-cn/) 的发展让 `JavaScript` 变得非常热门，在 `Node.js` 生态圈中，主流的后端框架不外乎就是 [Express](https://expressjs.com/) 与 [Koa](http://koajs.cn/)，这些框架非常 **自由** 且 **轻量**，能够快速地帮助我们建立应用，因此非常受欢迎。

但由于这些框架本身非常自由，所以 **没有严谨的架构规范**，非常容易写出 **高耦合、低内聚** 的代码，甚至 **文档结构非常松散**，使用这些主流框架的开发者如果没有制定一套规范，将会面临许多挑战。

后来出现了一套名为 [NestJS](https://nestjs.com/) 的框架，它受到前端框架 Angular 的启发，运用大量的 **设计模式** 与 **架构规范**，再搭配强类型的 [TypeScript](https://www.typescriptlang.org/)，提供开发人员 **严谨、易扩展、松耦合** 的开发环境。

> **！提示**：在本系列文章中，我将会用 `Nest` 表示 `NestJS`。

# 关于 Nest

![](https://docs.nestjs.cn/_media/icon.svg)

据官网介绍：`Nest`是 用于构建高效且可伸缩的服务端应用程序的渐进式 `Node.js`

Nest 提供了一个开箱即用的应用程序架构，允许开发人员和团队创建高度 **可测试，可扩展，松散耦合且易于维护** 的应用程序。Nest 可以选择使用 `Express` 或 `Fastify` 作为底层基础，来打造 MVC 或 REST API 的应用，并将各种热门套件进行整合，如：`TypeORM`、`mongoose`、`passport` 等，甚至还可以实现时下非常流行的微服务 ，可说是一套整合度很高的框架。

Nest 结合3种程序设计的思想：

- 面向对象编程 (**O**bject **O**riented **P**rogramming)
- 函数式编程 (**F**unctional **P**rogramming)
- 函数式响应编程 (**F**unctional **R**eactive **P**rogramming)

从这些概念中提取精华，再搭配设计模式，使 Nest 的整体架构十分清晰且严谨。

Nest 特点：

- 完美支持 `Typescript`
- 面向 `AOP` 编程
- 支持 `Typeorm`
- 高并发，异步非阻塞 `IO`
- `Node.js` 版的 `spring`
- 构建微服务应用

# 具备条件

建议读者们至少要具备以下条件，会比较容易理解接下来的内容：

1. 后端基本知识：至少要知道 **HTTP**、**HTTP Methods**。
2. 具备 **面向对象** 编程思维。
3. 有用过 **Node.js**。
4. 会使用终端。

# 开始之前

1. 下载安装 [Node.js](https://nodejs.org/zh-cn/)，建议安装 LTS 版本，会比较稳定。
2. 下载安装 [Vscode](https://code.visualstudio.com/) 编辑器。
3. 下载安装 [Postman](https://www.postman.com/downloads/) ，用于接口调试。

> **！提示**：**Node** 也可以使用 [nvm](https://github.com/nvm-sh/nvm) 或 [n](https://www.npmjs.com/package/n) 进行安装。

# 参考文献

- [Nest v8.x 中文官方文档 >>](https://docs.nestjs.cn/)
- [官网代码示例 >>](https://github.com/nestjs/nest/tree/master/sample)
- https://gitee.com/wenqiyun/nest-admin
- https://ithelp.ithome.com.tw/users/20119338/ironman/3880