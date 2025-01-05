import { ConflictException, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { UserService } from 'src/modules/user/user.service';
import { hash, verify } from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { AuthJwtPayload } from './types/auth-jwtPayload';
import refreshConfig from './config/refresh-config';
import { ConfigType } from '@nestjs/config';
import jwtConfig from './config/jwt-config';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    @Inject(refreshConfig.KEY)
    private readonly refreshTokenConfig: ConfigType<typeof refreshConfig>,
    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
  ) { }

  // Register user
  async registerUser(createUserDto: CreateUserDto) {
    const user = await this.userService.findByEmail(createUserDto.email);

    if (user) {
      throw new ConflictException('User already exists');
    }

    return this.userService.create(createUserDto);
  }

  // local strategy validate user
  async validateLocalUser(email: string, password: string) {
    const user = await this.userService.findByEmail(email);

    // TODO: add roles when local strategy returns user

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    const isPasswordValid = await verify(user.password, password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid password');
    }

    return user;
  }

  async login(user: User) {
    const { accessToken, refreshToken } = await this.generateTokens(user);
    const hashedRefreshToken = await hash(refreshToken);

    // TODO: add roles when local strategy returns user

    await this.userService.updateHashedRefreshToken(user.id, hashedRefreshToken);

    return {
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
      accessToken,
      refreshToken,
    }
  }

  async generateTokens(user: User) {
    const payload: AuthJwtPayload = {
      sub: user.id,
      email: user.email,
      name: user.name,
    };

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, { expiresIn: this.jwtConfiguration.signOptions.expiresIn }),
      this.jwtService.signAsync(payload, this.refreshTokenConfig),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }

  // jwt strategy validate user
  async validateJwtUser(userId: string) {
    // TODO: add roles when jwt strategy returns user
    const user = await this.userService.findById(userId);
    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    return {
      id: user.id,
      email: user.email,
      name: user.name,
    };
  }

  // refresh jwt strategy validate user
  async validateRefreshToken(userId: string, refreshToken: string) {
    // TODO: add roles when refresh jwt strategy returns user
    const user = await this.userService.findById(userId);
    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    const hashedRefreshToken = await verify(user.hashedRefreshToken, refreshToken);
    if (!hashedRefreshToken) {
      throw new UnauthorizedException('Invalid refresh token');
    }

    return {
      id: user.id,
      email: user.email,
      name: user.name,
    };
  }

  async refreshToken(user: User) {
    const { accessToken, refreshToken } = await this.generateTokens(user);
    const hashedRefreshToken = await hash(refreshToken);

    await this.userService.updateHashedRefreshToken(user.id, hashedRefreshToken);

    return {
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
      accessToken,
      refreshToken,
    };
  }

  async signout(user: User) {
    return await this.userService.updateHashedRefreshToken(user.id, null);
  }

  async validateGoogleUser(googleUser: CreateUserDto) {
    const user = await this.userService.findByEmail(googleUser.email);
    if (user) {
      return user;
    }

    return await this.userService.create(googleUser);
  }
}
