import { Injectable, NotFoundException } from '@nestjs/common';
import { hash } from 'argon2';
import { PrismaService } from 'src/prisma/prisma.service';

import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    const { password, ...user } = createUserDto;
    const hashedPassword = await hash(password);

    return await this.prisma.user.create({
      data: {
        ...user,
        password: hashedPassword,
      },
    });
  }

  async findByEmail(email: string) {
    return await this.prisma.user.findUnique({
      where: { email },
    });
  }

  async findById(id: string) {
    return await this.prisma.user.findUnique({
      where: { id },
    });
  }

  async updateHashedRefreshToken(
    id: string,
    hashedRefreshToken: string | null,
  ) {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return await this.prisma.user.update({
      where: { id },
      data: { hashedRefreshToken },
    });
  }

  async getUserStores(id: string) {
    return await this.prisma.store.findMany({
      where: { userId: id },
    });
  }
}
