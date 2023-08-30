import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { SalesService } from './sales.service';
import { SalesController } from './sales.controller';
import { Sale } from './entities/sale.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [SalesController],
  providers: [SalesService],
  imports: [TypeOrmModule.forFeature([Sale]), AuthModule],
})
export class SalesModule {}
