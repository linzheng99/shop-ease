import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

import { CreateSizeDto } from './dto/create-size.dto';

@Injectable()
export class SizeService {
  constructor(private readonly prisma: PrismaService) {}

  async createSize(userId: string, data: CreateSizeDto) {
    const store = await this.prisma.store.findUnique({
      where: { userId, id: data.storeId },
    });

    if (!store) {
      throw new UnauthorizedException('Store not found');
    }

    return await this.prisma.size.create({
      data,
    });
  }

  async getSizes(storeId: string) {
    const store = await this.prisma.store.findUnique({
      where: { id: storeId },
    });

    if (!store) {
      throw new UnauthorizedException('Store not found');
    }

    return await this.prisma.size.findMany({
      where: { storeId },
    });
  }

  async deleteSize(userId: string, storeId: string, id: string) {
    const store = await this.prisma.store.findUnique({
      where: { id: storeId, userId },
    });

    if (!store) {
      throw new UnauthorizedException('Store not found');
    }

    const size = await this.prisma.size.findUnique({
      where: { id, storeId },
    });

    if (!size) {
      throw new NotFoundException('Size not found');
    }

    return await this.prisma.size.delete({ where: { id } });
  }
}
