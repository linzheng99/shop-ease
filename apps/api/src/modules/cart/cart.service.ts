import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

import { AddToCartDto } from './dto/add-to-cart.dto';
import { UpdateCartItemDto } from './dto/update-cart-item.dto';

@Injectable()
export class CartService {
  constructor(private readonly prisma: PrismaService) {}

  async getOrCreateCart(userId: string) {
    const cart = await this.prisma.cart.findUnique({
      where: { userId },
    });

    if (!cart) {
      await this.prisma.cart.create({
        data: { userId },
      });
    }

    return cart;
  }

  async getCart(userId: string) {
    await this.getOrCreateCart(userId);

    const cart = await this.prisma.cart.findUnique({
      where: { userId },
      include: {
        items: {
          include: {
            productVariant: {
              include: {
                product: {
                  include: {
                    images: true,
                  },
                },
                size: true,
                color: true,
              },
            },
          },
        },
      },
    });

    return cart;
  }

  async removeFromCart(userId: string, id: string) {
    const cart = await this.prisma.cart.findUnique({
      where: { userId },
    });

    if (!cart) {
      throw new UnauthorizedException('Cart not found');
    }

    const cartItem = await this.prisma.cartItem.findUnique({
      where: { id, cartId: cart.id },
    });

    if (!cartItem) {
      throw new NotFoundException('Cart item not found');
    }

    await this.prisma.cartItem.delete({
      where: { id },
    });

    return id;
  }

  async addToCart(userId: string, data: AddToCartDto) {
    const cart = await this.getOrCreateCart(userId);

    // check product exist
    const product = await this.prisma.product.findUnique({
      where: { id: data.productId },
    });
    if (!product) {
      throw new NotFoundException('Product not found');
    }

    // check product variant exist
    const productVariant = await this.prisma.productVariant.findUnique({
      where: {
        id: data.productVariantId,
      },
    });
    if (!productVariant) {
      throw new NotFoundException('Product variant not found');
    }

    const existingItem = await this.prisma.cartItem.findFirst({
      where: {
        cartId: cart.id,
        productVariantId: data.productVariantId,
      },
    });

    // if product variant already in cart, update quantity
    if (existingItem) {
      return await this.prisma.cartItem.update({
        where: { id: existingItem.id },
        data: { quantity: existingItem.quantity + data.quantity },
        include: {
          productVariant: {
            include: {
              product: {
                include: {
                  images: true,
                },
              },
              size: true,
              color: true,
            },
          },
        },
      });
    }

    return await this.prisma.cartItem.create({
      data: {
        cartId: cart.id,
        productVariantId: data.productVariantId,
        quantity: data.quantity,
      },
      include: {
        productVariant: {
          include: {
            product: {
              include: {
                images: true,
              },
            },
            size: true,
            color: true,
          },
        },
      },
    });
  }

  async updateCartItem(
    userId: string,
    cartId: string,
    data: UpdateCartItemDto,
  ) {
    const cart = await this.getCart(userId);

    if (!cart) {
      throw new NotFoundException('Cart not found');
    }

    const cartItem = await this.prisma.cartItem.findUnique({
      where: { id: cartId, cartId: cart.id },
    });

    if (!cartItem) {
      throw new NotFoundException('Cart item not found');
    }

    return await this.prisma.cartItem.update({
      where: { id: cartItem.id },
      data: { quantity: data.quantity },
      include: {
        productVariant: {
          include: {
            product: {
              include: {
                images: true,
              },
            },
            size: true,
            color: true,
          },
        },
      },
    });
  }

  async clearCart(userId: string) {
    const cart = await this.getCart(userId);

    if (!cart) {
      throw new NotFoundException('Cart not found');
    }

    await this.prisma.cartItem.deleteMany({
      where: { cartId: cart.id },
    });

    return cart.id;
  }
}
