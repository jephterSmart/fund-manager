import { Fund } from 'src/domain/model/fund/fund';
import BaseEntityModelFactory from '../base-entity-model.factory';
import FundEntity from './fund.entity';
import { InvestmentEntity } from './investment.entity';
import { InvestorEntity } from './investor.entity';
import Money from 'src/domain/model/fund/values/money';
import Commitment from 'src/domain/model/fund/values/commitment';
import Investor from 'src/domain/model/fund/investor';
import Investment from 'src/domain/model/fund/investment';
import { Injectable } from '@nestjs/common';

@Injectable()
class FundEntityModelFactory
  implements
    BaseEntityModelFactory<
      FundEntity | InvestorEntity | InvestmentEntity,
      Fund
    >
{
  public toDomain(
    fundEntity: FundEntity,
    {
      investmentEntities,
      investorEntities,
    }: {
      investorEntities: InvestorEntity[];
      investmentEntities: InvestmentEntity[];
    },
  ): Fund {
    const fund = new Fund(
      fundEntity.fundId,
      fundEntity.name,
      new Money(fundEntity.targetFundSize, 'USD'),
    );
    fund.totalCommitments = new Money(fundEntity.totalCommitments, 'USD');
    fund.totalCollected = new Money(fundEntity.totalCollected, 'USD');
    fund.totalDistributed = new Money(fundEntity.totalDistributed, 'USD');
    fund.investors = investorEntities.map(
      (inv) =>
        new Investor(
          inv.investorId,
          new Commitment(new Money(inv.commitment, 'USD')),
          new Money(inv.amountCollected, 'USD'),
          new Money(inv.amountRequested, 'USD'),
        ),
    );
    fund.investments = investmentEntities.map(
      (inv) =>
        new Investment(
          inv.investmentId,
          inv.businessId,
          new Money(inv.amountInvested, 'USD'),
        ),
    );
    return fund;
  }

  public toEntity(fund: Fund): FundEntity {
    const fundEntity = new FundEntity();
    fundEntity.fundId = fund.id;
    fundEntity.name = fund.name;
    fundEntity.targetFundSize = +fund.targetFundSize;
    fundEntity.totalCommitments = +fund.totalCommitments;
    fundEntity.totalCollected = +fund.totalCollected;
    fundEntity.totalDistributed = +fund.totalDistributed;
    return fundEntity;
  }
}

export default FundEntityModelFactory;
