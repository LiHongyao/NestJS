import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';

@Injectable()
export class RoleGuard implements CanActivate {
  // -- 注入Reflector
  constructor(private readonly reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    // -- 获取metadata数据
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    // -- 获取请求对象
    const request = context.switchToHttp().getRequest();
    // -- 拿到用户数据
    const user = request.user;
    // -- 自定义校验逻辑，判断用户权限
    return this.matchRoles(roles, user.roles);
  }

  private matchRoles(resources: string[], target: string[]): boolean {
    return !!resources.find((x) => target.find((y) => y === x));
  }
}
