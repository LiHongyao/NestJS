![](./IMGS/201193386hVCd5hrJj.png)

# 示例：响应拦截器

```shell
$ nest g in common/interceptors/response
```

```typescript
import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IResponse } from '../interfaces/response.interface';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<IResponse> {
    // 实现数据的遍历与转变
    return next.handle().pipe(
      map((response: IResponse) => {
        const { code, msg, data, page } = response;
        return {
          code: code || 0,
          data: data || null,
          msg: msg || 'success',
          page,
        };
      }),
    );
  }
}
```

```typescript
app.useGlobalInterceptors(new ResponseInterceptor());
```



