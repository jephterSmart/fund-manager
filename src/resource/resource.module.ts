import { Module } from '@nestjs/common';
import { FundController } from './fund/fund.controller';
import { CqrsModule } from '@nestjs/cqrs';

@Module({
  imports: [CqrsModule],
  controllers: [FundController],
})
export class ResourceModule {}
