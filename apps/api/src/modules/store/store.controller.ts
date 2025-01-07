import { Body, Controller, Get, Post, Request } from '@nestjs/common';
import { User } from '@prisma/client';

import { Public } from '../../common/decorators/public-decorator';
import { CreateStoreDto } from './dto/create-store.dto';
import { StoreService } from './store.service';

@Controller('store')
export class StoreController {
  constructor(private readonly storeService: StoreService) {}

  @Public()
  @Get('list')
  getStores() {
    return this.storeService.getStores();
  }

  @Post('create')
  createStore(@Body() body: CreateStoreDto, @Request() req: { user: User }) {
    return this.storeService.createStore(body, req.user.id);
  }
}
