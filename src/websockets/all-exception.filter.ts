import { BaseWsExceptionFilter } from '@nestjs/websockets';
import { Catch, ArgumentsHost } from '@nestjs/common';
import { isObject } from '@nestjs/common/utils/shared.utils';

@Catch()
export class AllExceptionsFilter extends BaseWsExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const args = host.getArgs();
    if (args.length === 3) {
      const status = 'error';
      let result: unknown;
      let message: Record<string, any>;
      try {
        result = exception.getError();
        message = isObject(result) ? result : { status, message: result };
      } catch (ignored) {
        message = { status, message: exception };
      }
      const cb = args[2];
      cb(message, null);
    } else {
      super.catch(exception, host);
    }
  }
}
