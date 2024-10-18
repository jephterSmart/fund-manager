import { Module } from '@nestjs/common';
import { fundProviders } from './fund/fund.providers';
import { CqrsModule } from '@nestjs/cqrs';
import { InfrastructureModule } from 'src/infrastructure/infrastructure.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { TransactionInterceptor } from 'src/infrastructure/database/transaction/transaction.interceptor';
import { TypeOrmModule, getDataSourceToken } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

@Module({
  imports: [CqrsModule, InfrastructureModule, TypeOrmModule],
  providers: [
    ...fundProviders,
    {
      provide: APP_INTERCEPTOR,
      useClass: TransactionInterceptor,
    },
  ],
})
export class ApplicationModule {}
