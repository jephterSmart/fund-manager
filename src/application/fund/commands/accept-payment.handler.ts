import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import TypeormFundRepository from 'src/infrastructure/fund/typeorm-fund.repository';
import Money from 'src/domain/model/fund/values/money';
import { AcceptPaymentCommand } from './accept-payment.command';
import { Transactional } from 'src/infrastructure/database/transaction/transaction.decorator';

@CommandHandler(AcceptPaymentCommand)
export class AcceptPaymentHandler
  implements ICommandHandler<AcceptPaymentCommand>
{
  constructor(private readonly fundRepository: TypeormFundRepository) {}

  @Transactional()
  async execute(command: AcceptPaymentCommand): Promise<void> {
    const { fundId, investorId } = command;

    const fund = await this.fundRepository.findOne(fundId);
    fund.confirmInvestorPayment(investorId);

    await this.fundRepository.save(fund);
  }
}
