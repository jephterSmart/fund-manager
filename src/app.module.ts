import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { InfrastructureModule } from './infrastructure/infrastructure.module';
import { DomainModule } from './domain/domain.module';
import configuration from './config/configuration';
import { CqrsModule } from '@nestjs/cqrs';
import { ApplicationModule } from './application/application.module';
import { ResourceModule } from './resource/resource.module';

@Module({
  imports: [
    InfrastructureModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      cache: true,
    }),
    DomainModule,
    CqrsModule,
    ApplicationModule,
    ResourceModule,
  ],
})
export class AppModule {}
