import {
  CallHandler,
  ExecutionContext,
  Inject,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { DataSource, QueryRunner } from 'typeorm';
import { TRANSACTIONAL_KEY } from './transaction.decorator';
import { getDataSourceToken } from '@nestjs/typeorm';

@Injectable()
export class TransactionInterceptor implements NestInterceptor {
  constructor(
    private readonly reflector: Reflector,
    @Inject(getDataSourceToken())
    private readonly dataSource: DataSource,
  ) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const isTransactional = this.reflector.get<boolean>(
      TRANSACTIONAL_KEY,
      context.getHandler(),
    );

    if (!isTransactional) {
      return next.handle();
    }

    const queryRunner: QueryRunner = this.dataSource.createQueryRunner();
    return new Observable((observer) => {
      queryRunner
        .connect()
        .then(() => queryRunner.startTransaction())
        .then(() => {
          const result$ = next.handle();
          result$.subscribe({
            next: async (result) => {
              await queryRunner.commitTransaction();
              observer.next(result);
              observer.complete();
            },
            error: async (err) => {
              await queryRunner.rollbackTransaction();
              observer.error(err);
            },
          });
        })
        .catch((err) => {
          observer.error(err);
        })
        .finally(() => {
          queryRunner.release();
        });
    });
  }
}
