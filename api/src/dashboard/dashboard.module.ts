import { Module } from '@nestjs/common';
import { DashboardService } from './services/dashboard/dashboard.service';
import { DashboardController } from './controller/dashboard/dashboard.controller';

@Module({
  providers: [DashboardService],
  controllers: [DashboardController]
})
export class DashboardModule {}
