import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  Res,
  UseGuards,
} from '@nestjs/common';
import { User } from '@prisma/client';
import { Response } from 'express';

import { CreateUserDto } from '../user/dto/create-user.dto';
import { AuthService } from './auth.service';
import { Public } from './decorators/public-decorator';
import { GoogleAuthGuard } from './guards/google-auth.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { RefreshAuthGuard } from './guards/refresh-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('signup')
  registerUser(@Body() createUserDto: CreateUserDto) {
    return this.authService.registerUser(createUserDto);
  }

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('signin')
  signin(@Request() req: { user: User }) {
    return this.authService.login(req.user);
  }

  @Get('profile')
  getProfile(@Request() req: { user: User }) {
    return req.user;
  }

  @Public()
  @UseGuards(RefreshAuthGuard)
  @Post('refresh')
  refreshToken(@Request() req: { user: User }) {
    return this.authService.refreshToken(req.user);
  }

  @Public()
  @Post('signout')
  async signout(@Request() req: { user: User }) {
    return this.authService.signout(req.user);
  }

  @Public()
  @UseGuards(GoogleAuthGuard)
  @Get('google/login')
  async googleLogin() {}

  @Public()
  @UseGuards(GoogleAuthGuard)
  @Get('google/callback')
  async googleCallback(@Request() req: { user: User }, @Res() res: Response) {
    const response = await this.authService.login(req.user);
    const { user, accessToken, refreshToken } = response;

    res.redirect(
      `http://localhost:3000/api/auth/google/callback?userId=${user.id}&name=${user.name}&email=${user.email}&accessToken=${accessToken}&refreshToken=${refreshToken}`,
    );
  }
}
