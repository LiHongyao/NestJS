/*
 * @Author: Lee
 * @Date: 2022-05-25 18:08:59
 * @LastEditors: Lee
 * @LastEditTime: 2022-05-25 19:08:03
 * @Description:
 */
import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateTodoDto {
  @MaxLength(20)
  @IsString()
  @IsNotEmpty()
  public readonly title: string;

  @IsString()
  @IsOptional()
  public readonly description?: string;
}


