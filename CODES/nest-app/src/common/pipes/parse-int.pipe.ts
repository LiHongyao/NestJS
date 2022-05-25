/*
 * @Author: Lee
 * @Date: 2022-05-25 17:45:33
 * @LastEditors: Lee
 * @LastEditTime: 2022-05-25 17:49:07
 * @Description: 
 */
import { ArgumentMetadata, Injectable, NotAcceptableException,  PipeTransform } from '@nestjs/common';

@Injectable()
export class ParseIntPipe implements PipeTransform<string, number> {
  transform(value: string, metadata: ArgumentMetadata) {
    const integer = parseInt(value);
    if (isNaN(integer)) {
      throw new NotAcceptableException('无法解析为数字');
    }
    return integer;
  }
}
