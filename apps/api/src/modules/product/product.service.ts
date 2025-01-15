import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

import { CreateProductDto } from './dto/create-product.dto';
import { FilterProductsDto } from './dto/filter-products.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductService {
  constructor(private readonly prisma: PrismaService) {}

  async getProducts(storeId: string) {
    return await this.prisma.product.findMany({
      where: { storeId },
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
    });
  }

  async filterProducts(filterDto: FilterProductsDto) {
    const { storeId, categoryIds, colorIds, sizeIds } = filterDto;

    const whereConditions = {
      storeId,
      ...(categoryIds?.length > 0 && {
        categoryId: {
          in: categoryIds,
        },
      }),
      ...(colorIds?.length > 0 || sizeIds?.length > 0
        ? {
            productVariants: {
              some: {
                ...(colorIds?.length > 0 && {
                  colorId: {
                    in: colorIds,
                  },
                }),
                ...(sizeIds?.length > 0 && {
                  sizeId: {
                    in: sizeIds,
                  },
                }),
              },
            },
          }
        : {}),
    };

    const products = await this.prisma.product.findMany({
      where: whereConditions,
      include: {
        category: true,
        images: true,
        productVariants: {
          include: {
            size: true,
            color: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return products;
  }

  async getProduct(productId: string) {
    return await this.prisma.product.findUnique({
      where: { id: productId },
      include: {
        images: true,
        productVariants: {
          include: {
            color: true,
            size: true,
          },
        },
      },
    });
  }

  async createProduct(userId: string, data: CreateProductDto) {
    const store = await this.prisma.store.findUnique({
      where: { userId, id: data.storeId },
    });

    if (!store) {
      throw new UnauthorizedException('Store not found');
    }

    const product = await this.prisma.product.create({
      data: {
        ...data,
        images: {
          connect: data?.images?.map((image) => ({ id: image.id })) || [],
        },
        productVariants: {
          create:
            data?.productVariants?.map((variant) => ({
              ...variant,
              colorId: variant.colorId || null,
              sizeId: variant.sizeId || null,
            })) || [],
        },
      },
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
    });

    return product;
  }

  async updateProduct(
    userId: string,
    productId: string,
    data: UpdateProductDto,
  ) {
    const store = await this.prisma.store.findUnique({
      where: { userId, id: data.storeId },
    });

    if (!store) {
      throw new UnauthorizedException('Store not found');
    }

    const { productVariants, ...productData } = data;

    // 更新基础信息
    await this.prisma.product.update({
      where: { id: productId },
      data: {
        ...productData,
        images: {
          connect: data?.images?.map((image) => ({ id: image.id })) || [],
        },
      },
    });

    // 获取产品变体
    const existingVariants = await this.prisma.productVariant.findMany({
      where: { productId },
    });

    // 处理变体: 更新现有的变体; 创建新的变体
    const variantsPromises = productVariants.map(async (variant) => {
      if (variant.id) {
        return await this.prisma.productVariant.update({
          where: { id: variant.id },
          data: {
            ...variant,
            colorId: variant.colorId || null,
            sizeId: variant.sizeId || null,
          },
        });
      } else {
        return await this.prisma.productVariant.create({
          data: {
            ...variant,
            productId,
            colorId: variant.colorId || null,
            sizeId: variant.sizeId || null,
          },
        });
      }
    });

    await Promise.all(variantsPromises);

    // 删除不再需要的变体
    const updatedVariants = productVariants
      .filter((v) => v.id)
      .map((v) => v.id);

    const deletedVariants = existingVariants.filter(
      (v) => !updatedVariants.includes(v.id),
    );

    await this.prisma.productVariant.deleteMany({
      where: { id: { in: deletedVariants.map((v) => v.id) } },
    });

    return await this.prisma.product.findUnique({
      where: { id: productId },
      include: {
        images: true,
        category: true,
        productVariants: {
          include: { color: true, size: true },
        },
      },
    });
  }

  async deleteProduct(userId: string, storeId: string, productId: string) {
    const store = await this.prisma.store.findUnique({
      where: { userId, id: storeId },
    });

    if (!store) {
      throw new UnauthorizedException('Store not found');
    }
    const product = await this.prisma.product.findUnique({
      where: { id: productId },
    });

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    return await this.prisma.product.delete({
      where: { id: productId },
    });
  }
}
