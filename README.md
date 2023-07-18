# 前言

近年来，[Node.js](https://nodejs.org/zh-cn/) 的发展让 `JavaScript` 变得非常热门，在 `Node.js` 生态圈中，主流的后端框架不外乎就是 [Express](https://expressjs.com/) 与 [Koa](http://koajs.cn/)，这些框架非常 **自由** 且 **轻量**，能够快速地帮助我们建立应用，因此非常受欢迎。

但由于这些框架本身非常自由，所以 **没有严谨的架构规范**，非常容易写出 **高耦合、低内聚** 的代码，甚至 **文档结构非常松散**，使用这些主流框架的开发者如果没有制定一套规范，将会面临许多挑战。

后来出现了一套名为 [NestJS](https://www.nestjs.com.cn/) 的框架，它受到前端框架 Angular 的启发，运用大量的 **设计模式** 与 **架构规范**，再搭配强类型的 [TypeScript](https://www.typescriptlang.org/)，提供开发人员 **严谨、易扩展、松耦合** 的开发环境。

> **！提示**：在本系列文章中，我将会用 `Nest` 表示 `NestJS`。

# 关于 Nest

![](https://docs.nestjs.cn/_media/icon.svg)

据官网介绍：

> Nest (NestJS) 是一个用于构建高效、可扩展的 [Node.js](https://nodejs.org/) 服务器端应用程序的开发框架。它利用 JavaScript 的渐进增强的能力，使用并完全支持 [TypeScript](http://www.typescriptlang.org/) （仍然允许开发者使用纯 JavaScript 进行开发），并结合了 OOP （面向对象编程）、FP （函数式编程）和 FRP （函数响应式编程） —— 摘自官网

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
3. 下载安装 [Apifox](https://www.apifox.cn/?utm_source=Bob) ，用于接口调试。

> **！提示**：**Node** 也可以使用 [nvm](https://github.com/nvm-sh/nvm) 或 [n](https://www.npmjs.com/package/n) 进行安装。

# 参考文献

- [Nest v9.x 中文官方文档 >>](https://docs.nestjs.cn/9/introduction)
- [官网代码示例 >>](https://github.com/nestjs/nest/tree/master/sample)