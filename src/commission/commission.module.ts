import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from 'src/auth/auth.module';
import { CommissionService } from './commission.service';
import { CommissionController } from './commission.controller';
import { Commission } from './entities/commission.entity';

@Module({
  controllers: [CommissionController],
  providers: [CommissionService],
  imports: [TypeOrmModule.forFeature([Commission]), AuthModule],
})
export class CommissionModule {}
