import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { fundProviders } from './fund.providers';
import TypeormFundRepository from './typeorm-fund.repository';
import FundEntityModelFactory from './fund-entity-model.factory';

@Module({
  imports: [DatabaseModule],
  providers: [...fundProviders, FundEntityModelFactory, TypeormFundRepository],
  exports: [TypeormFundRepository],
})
export class FundModule {
  onModuleInit() {}
}
