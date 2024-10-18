import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetAllFundsQuery } from './get-all-funds.query';
import TypeormFundRepository from 'src/infrastructure/fund/typeorm-fund.repository';
import { Fund } from 'src/domain/model/fund/fund';

@QueryHandler(GetAllFundsQuery)
export class GetAllFundsHandler implements IQueryHandler<GetAllFundsQuery> {
  constructor(private readonly fundRepository: TypeormFundRepository) {}

  async execute(query: GetAllFundsQuery): Promise<Fund[]> {
    const fund = await this.fundRepository.findAll();
    return fund;
  }
}
