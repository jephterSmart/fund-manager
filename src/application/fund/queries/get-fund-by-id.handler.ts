import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { GetFundByIdQuery } from './get-fund-by-id.query';
import TypeormFundRepository from 'src/infrastructure/fund/typeorm-fund.repository';
import { Fund } from 'src/domain/model/fund/fund';

@QueryHandler(GetFundByIdQuery)
export class GetFundByIdHandler implements IQueryHandler<GetFundByIdQuery> {
  constructor(private readonly fundRepository: TypeormFundRepository) {}

  async execute(query: GetFundByIdQuery): Promise<Fund> {
    const fund = await this.fundRepository.findOne(query.id);
    return fund;
  }
}
