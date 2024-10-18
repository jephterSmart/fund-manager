import FundRepository from 'src/domain/model/fund/fund.repository';
import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import FundEntity from './fund.entity';
import { InvestorEntity } from './investor.entity';
import { InvestmentEntity } from './investment.entity';
import FundEntityModelFactory from './fund-entity-model.factory';
import { Fund } from 'src/domain/model/fund/fund';
import { randomUUID } from 'crypto';

@Injectable()
class TypeormFundRepository implements FundRepository {
  constructor(
    @Inject(FundEntity.name)
    private readonly fundRepository: Repository<FundEntity>,
    @Inject(InvestorEntity.name)
    private readonly investorRepository: Repository<InvestorEntity>,
    @Inject(InvestmentEntity.name)
    private readonly investmentRepository: Repository<InvestmentEntity>,

    @Inject(FundEntityModelFactory)
    private readonly entityModelFactory: FundEntityModelFactory,
  ) {}

  async findOne(fundId: string): Promise<Fund> {
    const fundEntity = await this.fundRepository.findOne({ where: { fundId } });
    const investorEntities = await this.investorRepository.find({
      where: { fundId },
    });
    const investmentEntities = await this.investmentRepository.find({
      where: { fundId },
    });

    if (!fundEntity) throw new Error('Fund not found');

    return this.entityModelFactory.toDomain(fundEntity, {
      investorEntities,
      investmentEntities,
    });
  }

  async save(fund: Fund): Promise<void> {
    const oldEntity = await this.fundRepository.findOne({
      where: { fundId: fund.id },
    });
    const newEntity = this.entityModelFactory.toEntity(fund);
    const fundEntity = oldEntity ? { ...oldEntity, ...newEntity } : newEntity;

    await this.fundRepository.save(fundEntity);

    // Map and save related investors and investments
    const investorEntities = await Promise.all(
      fund.investors.map(async (inv) => {
        const oldEntity = await this.investorRepository.findOne({
          where: { investorId: inv.investorId, fundId: fund.id },
        });
        return {
          ...(oldEntity || {}),
          fundId: fund.id,
          investorId: inv.investorId,
          commitment: +inv.getCommitment().amount,
          amountRequested: +inv.getAmountRequested(),
          amountCollected: +inv.getAmountCollected(),
        };
      }),
    );

    const investmentEntities = await Promise.all(
      fund.investments.map(async (inv) => {
        const oldEntity = await this.investmentRepository.findOne({
          where: { investmentId: inv.investmentId, fundId: fund.id },
        });
        return {
          ...(oldEntity || {}),
          fundId: fund.id,
          investmentId: inv.investmentId,
          businessId: inv.businessId,
          amountInvested: +inv.amountInvested,
        };
      }),
    );

    await this.investorRepository.save(investorEntities);
    await this.investmentRepository.save(investmentEntities);
  }
  nextId(): string {
    return `fund-${randomUUID()}`;
  }

  async findAll(): Promise<Fund[]> {
    const entities = await this.fundRepository.find({});
    return entities.map((ent) =>
      this.entityModelFactory.toDomain(ent, {
        investorEntities: [],
        investmentEntities: [],
      }),
    );
  }
}
export default TypeormFundRepository;
