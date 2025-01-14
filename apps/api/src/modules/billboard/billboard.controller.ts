import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Request,
} from '@nestjs/common';

import { BillboardService } from './billboard.service';
import { CreateBillboardDto } from './dto/create-billboard.dto';
import { EditBillboardDto } from './dto/edit-billboard.dto';

@Controller('billboard')
export class BillboardController {
  constructor(private readonly billboardService: BillboardService) {}

  @Get('list/:storeId')
  async getBillboards(
    @Request() req: { user: { id: string } },
    @Param('storeId') storeId: string,
  ) {
    return await this.billboardService.getBillboards(req.user.id, storeId);
  }

  @Post('create')
  async createBillboard(@Body() body: CreateBillboardDto) {
    return await this.billboardService.createBillboard(body);
  }

  @Get(':id')
  async getBillboard(@Param('id') id: string) {
    return await this.billboardService.getBillboard(id);
  }

  @Patch(':id')
  async editBillboard(
    @Request() req: { user: { id: string } },
    @Param('id') id: string,
    @Body() body: EditBillboardDto,
  ) {
    return await this.billboardService.editBillboard(req.user.id, id, body);
  }

  @Delete(':id')
  async deleteBillboard(@Param('id') id: string) {
    return await this.billboardService.deleteBillboard(id);
  }
}
