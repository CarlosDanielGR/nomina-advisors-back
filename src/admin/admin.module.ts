import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { AuthModule } from 'src/auth/auth.module';
import { CommissionModule } from 'src/commission/commission.module';

@Module({
  controllers: [AdminController],
  providers: [AdminService],
  imports: [AuthModule, CommissionModule],
})
export class AdminModule {}
