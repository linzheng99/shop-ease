import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

import { CreateCategoryDto } from './dto/create-category.dto';

@Injectable()
export class CategoryService {
  constructor(private readonly prisma: PrismaService) {}

  async createCategory(userId: string, data: CreateCategoryDto) {
    const store = await this.prisma.store.findUnique({
      where: { userId, id: data.storeId },
    });

    if (!store) {
      throw new UnauthorizedException('Store not found');
    }

    return await this.prisma.category.create({
      data,
    });
  }

  async getCategories(storeId: string) {
    const store = await this.prisma.store.findUnique({
      where: { id: storeId },
    });

    if (!store) {
      throw new UnauthorizedException('Store not found');
    }

    return await this.prisma.category.findMany({
      where: { storeId },
    });
  }

  async deleteCategory(userId: string, storeId: string, id: string) {
    const store = await this.prisma.store.findUnique({
      where: { id: storeId, userId },
    });

    if (!store) {
      throw new UnauthorizedException('Store not found');
    }

    const category = await this.prisma.category.findUnique({
      where: { id, storeId },
    });

    if (!category) {
      throw new NotFoundException('Category not found');
    }

    return await this.prisma.category.delete({ where: { id } });
  }
}
