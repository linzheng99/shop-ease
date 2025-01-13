import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { PrismaService } from 'src/prisma/prisma.service';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CartController } from './cart.controller';
import { CartService } from './cart.service';

@Module({
  controllers: [CartController],
  providers: [
    CartService,
    PrismaService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class CartModule {}
