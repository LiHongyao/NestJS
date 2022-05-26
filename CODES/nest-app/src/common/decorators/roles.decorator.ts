/*
 * @Author: Lee
 * @Date: 2022-05-26 12:34:08
 * @LastEditors: Lee
 * @LastEditTime: 2022-05-26 12:59:33
 * @Description: 
 */
import { SetMetadata } from '@nestjs/common';

export const Roles = (...args: string[]) => SetMetadata('roles', args);
