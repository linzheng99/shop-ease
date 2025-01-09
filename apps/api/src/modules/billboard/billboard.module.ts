import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { PrismaService } from 'src/prisma/prisma.service';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { BillboardController } from './billboard.controller';
import { BillboardService } from './billboard.service';

@Module({
  controllers: [BillboardController],
  providers: [
    BillboardService,
    PrismaService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class BillboardModule {}
