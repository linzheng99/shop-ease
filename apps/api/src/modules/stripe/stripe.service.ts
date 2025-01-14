import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import Big from 'big.js';
import { PrismaService } from 'src/prisma/prisma.service';
import Stripe from 'stripe';

@Injectable()
export class StripeService {
  private readonly PAYMENT_EXPIRATION_MINUTES = 30;
  constructor(
    private readonly prisma: PrismaService,
    @Inject('STRIPE')
    private readonly stripe: Stripe,
  ) {}

  async createCheckoutSession(userId: string, ids: string[]) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new UnauthorizedException('User not found');
    }
    if (!ids.length) {
      throw new BadRequestException('No items to checkout');
    }

    // Fetch cart items with their associated product variants, products, and store information
    const cartItems = await this.prisma.cartItem.findMany({
      where: {
        id: { in: ids },
        cart: { userId },
      },
      include: {
        productVariant: {
          include: {
            product: {
              include: {
                store: true,
              },
            },
            size: true,
            color: true,
          },
        },
      },
    });

    if (!cartItems.length) {
      throw new NotFoundException('No valid items found');
    }

    // Group cart items by store
    const itemsByStore = cartItems.reduce(
      (acc, item) => {
        const storeId = item.productVariant.product.store.id;
        if (!acc[storeId]) {
          acc[storeId] = [];
        }
        acc[storeId].push(item);
        return acc;
      },
      {} as Record<string, typeof cartItems>,
    );

    const checkoutSessions = await Promise.all(
      Object.entries(itemsByStore).map(async ([storeId, storeItems]) => {
        // Calculate total price for this store's items
        const totalPrice = storeItems.reduce(
          (sum, item) =>
            sum + item.productVariant.product.price * item.quantity,
          0,
        );

        // set expiration time
        const expiresAt = new Date();
        expiresAt.setMinutes(
          expiresAt.getMinutes() + this.PAYMENT_EXPIRATION_MINUTES,
        );

        // Create order for this store
        const order = await this.prisma.order.create({
          data: {
            userId,
            storeId,
            totalPrice,
            status: 'PENDING',
            expiresAt,
            orderItems: {
              create: storeItems.map((item) => {
                const itemPrice = new Big(item.productVariant.product.price);
                const quantity = item.quantity;
                const totalItemPrice = itemPrice.times(quantity);

                return {
                  quantity,
                  price: itemPrice.toNumber(),
                  totalPrice: totalItemPrice.toNumber(),
                  productName: item.productVariant.product.name,
                  variantSize: item.productVariant.size?.name,
                  variantColor: item.productVariant.color?.name,
                  colorValue: item.productVariant.color?.value,
                  productVariantId: item.productVariant.id,
                };
              }),
            },
          },
        });

        // Create line items for Stripe
        const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] =
          storeItems.map((item) => ({
            quantity: item.quantity,
            price_data: {
              currency: 'USD',
              product_data: {
                name: `${item.productVariant.product.name}${
                  item.productVariant.size
                    ? ` - Size: ${item.productVariant.size.name}`
                    : ''
                }${
                  item.productVariant.color
                    ? ` - Color: ${item.productVariant.color.name}`
                    : ''
                }`,
              },
              unit_amount: Math.round(item.productVariant.product.price * 100),
            },
          }));

        // Create Stripe checkout session for this store
        const session = await this.stripe.checkout.sessions.create({
          line_items,
          mode: 'payment',
          billing_address_collection: 'required',
          phone_number_collection: {
            enabled: true,
          },
          expires_at: Math.floor(expiresAt.getTime() / 1000),
          success_url: `${process.env.FRONTEND_URL}/order?success=true`,
          cancel_url: `${process.env.FRONTEND_URL}/order?canceled=true`,
          metadata: {
            orderId: order.id,
            storeId: storeId,
          },
        });

        try {
          await this.prisma.order.update({
            where: { id: order.id, userId },
            data: { paymentUrl: session.url },
          });
        } catch (error) {
          console.error('Error updating order', error);
        }

        return {
          storeId,
          storeName: storeItems[0].productVariant.product.store.name,
          sessionUrl: session.url,
          orderId: order.id,
          expiresAt: order.expiresAt,
        };
      }),
    );

    // Delete the cart items that have been checked out
    await this.prisma.cartItem.deleteMany({
      where: {
        id: { in: ids },
        cart: { userId },
      },
    });

    return checkoutSessions;
  }

  // schedule task to cancel expired orders
  @Cron(CronExpression.EVERY_5_MINUTES)
  async handleExpiredOrders() {
    const now = new Date();

    await this.prisma.order.updateMany({
      where: {
        status: 'PENDING',
        expiresAt: {
          lt: now,
        },
      },
      data: {
        status: 'CANCELLED',
      },
    });
  }

  // handle Stripe Webhook
  async handleStripeWebhook(event: Stripe.Event) {
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as Stripe.Checkout.Session;
      const orderId = session.metadata?.orderId;

      if (orderId) {
        const order = await this.prisma.order.findUnique({
          where: { id: orderId },
          include: {
            orderItems: {
              include: {
                productVariant: true,
              },
            },
          },
        });

        if (!order) {
          throw new NotFoundException('Order not found');
        }

        await this.prisma.order.update({
          where: { id: orderId },
          data: { status: 'DELIVERED', paymentUrl: null },
        });

        await Promise.all(
          order.orderItems.map(async (item) => {
            const { productVariantId, quantity } = item;
            if (productVariantId) {
              const variant = await this.prisma.productVariant.findUnique({
                where: { id: productVariantId },
              });

              if (!variant) {
                throw new NotFoundException(
                  `Product variant not found: ${productVariantId}`,
                );
              }

              if (variant.quantity < quantity) {
                throw new BadRequestException(
                  `Insufficient stock for product variant: ${productVariantId}`,
                );
              }

              await this.prisma.productVariant.update({
                where: { id: productVariantId },
                data: { quantity: { decrement: quantity } },
              });
            }
          }),
        );
      }
    }
  }
}
