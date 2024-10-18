import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { AddInvestorCommitmentCommand } from './add-investor-commitment.command';
import TypeormFundRepository from 'src/infrastructure/fund/typeorm-fund.repository';
import Investor from 'src/domain/model/fund/investor';
import Money from 'src/domain/model/fund/values/money';
import { Transactional } from 'src/infrastructure/database/transaction/transaction.decorator';

@CommandHandler(AddInvestorCommitmentCommand)
export class AddInvestorCommitmentHandler
  implements ICommandHandler<AddInvestorCommitmentCommand>
{
  constructor(private readonly fundRepository: TypeormFundRepository) {}

  @Transactional()
  async execute(command: AddInvestorCommitmentCommand): Promise<void> {
    const { fundId, investorId, commitment } = command;

    const fund = await this.fundRepository.findOne(fundId);

    fund.addInvestorCommitment(investorId, commitment);

    await this.fundRepository.save(fund);
  }
}
