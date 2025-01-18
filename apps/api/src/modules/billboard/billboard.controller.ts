import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Request,
} from '@nestjs/common';
import { Public } from 'src/common/decorators/public-decorator';

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

  @Public()
  @Get('/:storeId/featured')
  async searchBillboards(
    @Param('storeId') storeId: string,
    @Query('isFeatured') isFeatured: boolean,
  ) {
    return await this.billboardService.searchBillboards(storeId, isFeatured);
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

  @Patch('featured/:id')
  async toggleFeatured(@Param('id') id: string) {
    return await this.billboardService.toggleFeatured(id);
  }

  @Delete(':id')
  async deleteBillboard(@Param('id') id: string) {
    return await this.billboardService.deleteBillboard(id);
  }
}
