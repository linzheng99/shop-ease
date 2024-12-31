import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(8000);
  app.useGlobalPipes(new ValidationPipe({
    // 将传入数据转换为 DTO 类型
    transform: true,
    // 删除不在 DTO 中的任何属性
    whitelist: true,
  }));
}
bootstrap();

