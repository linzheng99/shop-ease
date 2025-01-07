import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

import { CreateStoreDto } from './dto/create-store.dto';

@Injectable()
export class StoreService {
  constructor(private readonly prisma: PrismaService) {}

  async getStores() {
    return await this.prisma.store.findMany();
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
      throw new Error('User not found');
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
}
