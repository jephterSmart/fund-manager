import { Module } from '@nestjs/common';
import { FundModule } from './fund/fund.module';

@Module({
  imports: [FundModule]
})
export class ModelModule {}
