/*
 * @Author: Lee
 * @Date: 2022-05-26 12:59:03
 * @LastEditors: Lee
 * @LastEditTime: 2022-05-26 13:05:53
 * @Description:
 */
import { applyDecorators, UseGuards } from '@nestjs/common';
import { RoleGuard } from '../guards/role.guard';
import { AuthGuard } from '../guards/auth.guard';
import { Roles } from './roles.decorator';

export const Auth = (...roles: string[]) =>
  applyDecorators(Roles(...roles), UseGuards(AuthGuard, RoleGuard));
