import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { UserService } from 'src/modules/user/user.service';
import { PrismaService } from 'src/prisma/prisma.service';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import googleOauthConfig from './config/google-oauth-config';
import jwtConfig from './config/jwt-config';
import refreshConfig from './config/refresh-config';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { RolesGuard } from './guards/roles.guard';
import { GoogleStrategy } from './strategies/google-strategy';
import { JwtStrategy } from './strategies/jwt-strategy';
import { LocalStrategy } from './strategies/local-strategy';
import { RefreshJwtStrategy } from './strategies/refresh-jwt-strategy';

@Module({
  imports: [
    JwtModule.registerAsync(jwtConfig.asProvider()),
    ConfigModule.forFeature(jwtConfig),
    ConfigModule.forFeature(refreshConfig),
    ConfigModule.forFeature(googleOauthConfig),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    UserService,
    PrismaService,
    LocalStrategy,
    JwtStrategy,
    RefreshJwtStrategy,
    GoogleStrategy,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard, // @UseGuards(JwtAuthGuard)
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard, // @UseGuards(RolesGuard)
    },
  ],
})
export class AuthModule {}
