import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

import { SizeController } from './size.controller';
import { SizeService } from './size.service';

@Module({
  controllers: [SizeController],
  providers: [SizeService, PrismaService],
})
export class SizeModule {}
