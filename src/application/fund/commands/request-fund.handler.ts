import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { RequestFundCommand } from './request-fund.command';
import TypeormFundRepository from 'src/infrastructure/fund/typeorm-fund.repository';
import Money from 'src/domain/model/fund/values/money';
import { Transactional } from 'src/infrastructure/database/transaction/transaction.decorator';

@CommandHandler(RequestFundCommand)
export class RequestFundHandler implements ICommandHandler<RequestFundCommand> {
  constructor(private readonly fundRepository: TypeormFundRepository) {}

  @Transactional()
  async execute(command: RequestFundCommand): Promise<void> {
    const { fundId, investorId, amount } = command;

    const fund = await this.fundRepository.findOne(fundId);
    fund.requestFund(investorId, new Money(amount, 'USD'));

    await this.fundRepository.save(fund);
  }
}
