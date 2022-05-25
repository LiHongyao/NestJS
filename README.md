# 楔子

感觉好久没有写东西了，最近做了一个项目，后端用的是 `NestJS`，属于边学边应用吧，在网上搜了很多，国内教程千篇一律，或不够详细，官网有详尽的文档，不过我觉得有些示例没有讲清楚，所以现在准备出一套教程，也算是对自己的一个总结吧。

其实这两天一直在纠结有没有必要出这样的教程，这两天加班比较累，觉得自己会用就行，但基于以前5年的讲师经验，分享精神还在，所以还是决定出。

特别他提示：本文主要翻墙摘自台湾一哥们儿的博客，我觉得很受用，所以结合自己的一些理解分享给大家。原文地址 [戳这里 >>](https://ithelp.ithome.com.tw/users/20119338/ironman/3880)，不过要翻墙。

本系列文章参考：

- [ 中文文档 >>](https://docs.nestjs.cn/)
- [工程目录与代码规范 >>](https://www.toimc.com/nestjs-example-project-4/)
- https://gitee.com/wenqiyun/nest-admin
- https://github.com/nestjs
- https://ithelp.ithome.com.tw/users/20119338/ironman/3880

# 前言

近年来，前后端都可以看到 `JavaScript` 的踪影，[Node.js](https://nodejs.org/zh-cn/) 的诞生让 `JavaScript` 变得非常热门，在 `Node.js` 生态圈中，主流的后端框架不外乎就是 [Express](https://expressjs.com/) 与 [Koa](http://koajs.cn/)，这些框架非常 **自由** 且 **轻量**，能够快速建立应用，因此非常受欢迎。

由于这些框架非常自由，所以 **没有严谨的架构规范**，非常容易写出 **高耦合、低内聚** 的代码，甚至 **文档结构非常松散**，使用这些主流框架的开发者如果没有制定一套规范，将会面临许多挑战。

后来出现了一套名为 [NestJS](https://nestjs.com/) 的框架，它受到前端框架 Angular 的启发，运用大量的 **设计模式** 与 **架构规范**，再搭配强类型的 [TypeScript](https://www.typescriptlang.org/)，提供开发人员 **严谨、易扩展、松耦合** 的开发环境。

# 关于 Nest

![](https://docs.nestjs.cn/_media/icon.svg)

Nest 提供了一个开箱即用的应用程序架构，允许开发人员和团队创建高度 **可测试，可扩展，松散耦合且易于维护** 的应用程序。。Nest 可以选择使用 `Express` 或 `Fastify` 作为底层基础，来打造 MVC 或 REST API 的应用，并将各种热门套件进行整合，如：TypeORM、mongoose、passport 等，甚至还可以实现时下非常流行的微服务 (Microservice)，可说是一套整合度很高的框架。

Nest 结合3种程序设计的思想：

- 面向对象编程 (**O**bject **O**riented **P**rogramming)
- 函数式编程 (**F**unctional **P**rogramming)
- 函数式响应编程 (**F**unctional **R**eactive **P**rogramming)

从这些概念中提取精华，再搭配设计模式，使 Nest 的整体架构十分清晰且严谨。

# 具备条件

建议读者们至少要具备以下条件，会比较容易理解接下来的内容：

1. 后端基本知识：至少要知道 **HTTP**、**HTTP Methods**。
2. 具备 **面向对象** 编程思维。
3. 有用过 **Node.js**。
4. 会使用终端。

# 开始之前...

1. 至 [Node.js 官网](https://nodejs.org/zh-cn/)下载并安装 Node，这边建议安装 LTS 版本，会比较稳定。
2. 下载安装 [Vscode](https://code.visualstudio.com/) 编辑器。
3. 至 [Postman 官网](https://www.postman.com/downloads/) 下载并安装 Postman。

> **！Tips**：**Node.js** 也可以使用 [nvm](https://github.com/nvm-sh/nvm) 进行安装。