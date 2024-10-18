import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateFundCommand } from './create-fund.command';
import TypeormFundRepository from 'src/infrastructure/fund/typeorm-fund.repository';
import { Fund } from 'src/domain/model/fund/fund';
import Money from 'src/domain/model/fund/values/money';
import { Transactional } from 'src/infrastructure/database/transaction/transaction.decorator';

@CommandHandler(CreateFundCommand)
export class CreateFundHandler implements ICommandHandler<CreateFundCommand> {
  constructor(private readonly fundRepository: TypeormFundRepository) {}

  @Transactional()
  async execute(command: CreateFundCommand): Promise<string> {
    const { name, targetFundSize } = command;
    const fundId = this.fundRepository.nextId();
    const fund = new Fund(fundId, name, new Money(targetFundSize, 'USD'));
    await this.fundRepository.save(fund);
    return fundId;
  }
}
