import { AggregateRoot } from '@nestjs/cqrs';
import BaseEntity from './base.entity';

interface BaseEntityModelFactory<
  TEntity extends BaseEntity,
  TModel extends AggregateRoot,
> {
  toDomain(entity: TEntity, others?: Record<string, TEntity[]>): TModel;
  toEntity(model: TModel, others?: Record<string, TModel[]>): TEntity;
}

export default BaseEntityModelFactory;
