import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { type NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    rawBody: true,
  });

  app.useStaticAssets(join(__dirname, '..', 'uploads'), {
    prefix: '/uploads/',
  });

  app.useGlobalPipes(
    new ValidationPipe({
      // 将传入数据转换为 DTO 类型
      transform: true,
      // 删除不在 DTO 中的任何属性
      whitelist: true,
    }),
  );

  // CORS配置
  app.enableCors({
    origin: '*',
  });

  await app.listen(4000);
}
bootstrap();
