import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

import { CreateStoreDto } from './dto/create-store.dto';

@Injectable()
export class StoreService {
  constructor(private readonly prisma: PrismaService) {}

  async getStores() {
    return await this.prisma.store.findMany({
      include: {
        billboards: {
          where: {
            isFeatured: true,
          },
          include: {
            image: true,
          },
          take: 1,
        },
        products: {
          include: {
            images: true,
            category: true,
            productVariants: {
              include: {
                color: true,
                size: true,
              },
            },
          },
        },
      },
    });
  }

  async createStore(data: CreateStoreDto, userId: string) {
    const store = await this.prisma.store.create({
      data: {
        name: data.name,
        description: data.description,
        userId,
      },
    });

    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    if (store && user.role !== 'BUSINESS') {
      await this.prisma.user.update({
        where: { id: userId },
        data: {
          role: 'BUSINESS',
        },
      });
    }

    return store;
  }

  async getStoreById(id: string) {
    const store = await this.prisma.store.findUnique({
      where: { id },
      include: {
        products: {
          include: {
            category: true,
            images: true,
            productVariants: {
              include: {
                color: true,
                size: true,
              },
            },
          },
        },
      },
    });

    if (!store) {
      throw new NotFoundException('Store not found');
    }

    return store;
  }
}
