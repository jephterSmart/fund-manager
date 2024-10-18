import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DistributeFundCommand } from './distribute-fund.command';
import TypeormFundRepository from 'src/infrastructure/fund/typeorm-fund.repository';
import Money from 'src/domain/model/fund/values/money';
import { Transactional } from 'src/infrastructure/database/transaction/transaction.decorator';

@CommandHandler(DistributeFundCommand)
export class DistributeFundHandler
  implements ICommandHandler<DistributeFundCommand>
{
  constructor(private readonly fundRepository: TypeormFundRepository) {}

  @Transactional()
  async execute(command: DistributeFundCommand): Promise<void> {
    const { fundId, businessId, amount } = command;

    const fund = await this.fundRepository.findOne(fundId);
    fund.distributeFunds(businessId, new Money(amount, 'USD'));

    await this.fundRepository.save(fund);
  }
}
