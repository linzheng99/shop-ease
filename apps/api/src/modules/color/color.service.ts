import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

import { CreateColorDto } from './dto/create-color.dto';

@Injectable()
export class ColorService {
  constructor(private readonly prisma: PrismaService) {}

  async createColor(userId: string, data: CreateColorDto) {
    const store = await this.prisma.store.findUnique({
      where: { userId, id: data.storeId },
    });

    if (!store) {
      throw new UnauthorizedException('Store not found');
    }

    return await this.prisma.color.create({
      data,
    });
  }

  async getColors(storeId: string) {
    const store = await this.prisma.store.findUnique({
      where: { id: storeId },
    });

    if (!store) {
      throw new UnauthorizedException('Store not found');
    }

    return await this.prisma.color.findMany({
      where: { storeId },
    });
  }

  async deleteColor(userId: string, storeId: string, id: string) {
    const store = await this.prisma.store.findUnique({
      where: { id: storeId, userId },
    });

    if (!store) {
      throw new UnauthorizedException('Store not found');
    }

    const color = await this.prisma.color.findUnique({
      where: { id, storeId },
    });

    if (!color) {
      throw new NotFoundException('Color not found');
    }

    return await this.prisma.color.delete({ where: { id } });
  }
}
