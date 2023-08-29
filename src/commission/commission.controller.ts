import { Controller, Get, Post, Body, Patch, Delete } from '@nestjs/common';
import { CommissionService } from './commission.service';
import { CreateCommissionDto } from './dto/create-commission.dto';
import { UpdateCommissionDto } from './dto/update-commission.dto';

@Controller('commission')
export class CommissionController {
  constructor(private readonly commissionService: CommissionService) {}

  @Post()
  create(@Body() createCommissionDto: CreateCommissionDto[]) {
    return this.commissionService.create(createCommissionDto);
  }

  @Get()
  findAll() {
    return this.commissionService.findAll();
  }

  @Patch()
  update(@Body() updateCommissionDto: UpdateCommissionDto[]) {
    return this.commissionService.update(updateCommissionDto);
  }

  @Delete()
  remove() {
    return this.commissionService.remove();
  }
}
