import { NestFactory } from '@nestjs/core';

import AppModule from './app.module';
import { SocketIoAdapter } from './common/adapters';

async function bootstrap() {
  const { NODE_ENV } = process.env;
  console.log(`NODE_ENV=${NODE_ENV}`);
  let opts;
  if (NODE_ENV === 'debug') {
    opts = {
      logger: console,
    };
  } else {
    opts = {};
  }
  const app = await NestFactory.create(AppModule, opts);
  app.useWebSocketAdapter(new SocketIoAdapter(app, true));
  await app.listen(3000);
}
bootstrap();
