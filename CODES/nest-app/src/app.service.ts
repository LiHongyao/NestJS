/*
 * @Author: Lee
 * @Date: 2022-05-25 08:45:51
 * @LastEditors: Lee
 * @LastEditTime: 2022-05-25 21:35:06
 * @Description:
 */
import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { Todo } from './common/interfaces/todo.interface';

@Injectable()
export class AppService {
  // -- 注入httpService
  constructor(private readonly http: HttpService) {}

  async getTodos(): Promise<Observable<Todo>> {
    // -- 调用get请求
    return await this.http.get('/posts').pipe(map((resp) => resp.data));
  }
}
