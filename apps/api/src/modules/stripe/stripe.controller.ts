import {
  Body,
  Controller,
  Inject,
  Post,
  RawBodyRequest,
  Req,
  Request,
  UseGuards,
} from '@nestjs/common';
import { User } from '@prisma/client';
import { Request as ExportRequest } from 'express';
import { Public } from 'src/common/decorators/public-decorator';
import Stripe from 'stripe';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateCheckoutDto } from './dto/create-checkout.dto';
import { StripeService } from './stripe.service';

@Controller('stripe')
export class StripeController {
  constructor(
    private readonly stripeService: StripeService,
    @Inject('STRIPE')
    private readonly stripe: Stripe,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post('checkout')
  async createCheckoutSession(
    @Request() req: { user: User },
    @Body() body: CreateCheckoutDto,
  ) {
    return this.stripeService.createCheckoutSession(req.user.id, body.ids);
  }

  @Public()
  @Post('webhook')
  async handleWebhook(@Req() req: RawBodyRequest<ExportRequest>) {
    const signature = req.headers['stripe-signature'];
    try {
      const event = this.stripe.webhooks.constructEvent(
        req.rawBody,
        signature,
        process.env.STRIPE_WEBHOOK_SECRET!,
      );

      return this.stripeService.handleStripeWebhook(event);
    } catch (err) {
      console.error(err);
      throw new Error(`Webhook Error: ${err.message}`);
    }
  }
}
