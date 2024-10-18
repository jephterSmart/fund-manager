import { Module } from '@nestjs/common';
import { ModelModule } from './model/model.module';

@Module({
  imports: [ModelModule]
})
export class DomainModule {}
