import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { PrismaService } from 'src/prisma/prisma.service';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ColorController } from './color.controller';
import { ColorService } from './color.service';

@Module({
  controllers: [ColorController],
  providers: [
    ColorService,
    PrismaService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class ColorModule {}
