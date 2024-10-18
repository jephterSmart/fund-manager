import { DataSource } from 'typeorm';
import FundEntity from './fund.entity';
import { getDataSourceToken } from '@nestjs/typeorm';
import { InvestorEntity } from './investor.entity';
import { InvestmentEntity } from './investment.entity';

export const fundProviders = [
  {
    provide: FundEntity.name,
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(FundEntity),
    inject: [getDataSourceToken()],
  },
  {
    provide: InvestorEntity.name,
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(InvestorEntity),
    inject: [getDataSourceToken()],
  },
  {
    provide: InvestmentEntity.name,
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(InvestmentEntity),
    inject: [getDataSourceToken()],
  },
];
