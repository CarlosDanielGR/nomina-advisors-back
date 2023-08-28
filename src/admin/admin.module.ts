import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [AdminController],
  providers: [AdminService],
  imports: [AuthModule],
})
export class AdminModule {}
