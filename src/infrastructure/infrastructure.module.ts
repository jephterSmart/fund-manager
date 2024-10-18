import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { FundModule } from './fund/fund.module';

@Module({
  imports: [DatabaseModule, FundModule],
  exports: [FundModule, DatabaseModule],
})
export class InfrastructureModule {}
