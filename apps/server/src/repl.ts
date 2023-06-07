import { repl } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { AppModule } from './app/app.module';

async function bootstrap() {
  await repl(AppModule);
}

Logger.log('running repl mode');
bootstrap();
