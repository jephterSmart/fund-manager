import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import BaseEntity from '../base.entity';
import { InvestorEntity } from './investor.entity';
import { InvestmentEntity } from './investment.entity';

@Entity({ name: 'fund' })
class FundEntity extends BaseEntity {
  @Column({ unique: true })
  fundId: string;

  @Column()
  name: string;

  @Column()
  targetFundSize: number;

  @Column({ default: 0 })
  totalCommitments: number = 0;

  @Column({ default: 0 })
  totalCollected: number = 0;

  @Column({ default: 0 })
  totalDistributed: number = 0;

  @OneToMany(() => InvestorEntity, (investor) => investor.id, { cascade: true })
  investors: InvestorEntity[];

  @OneToMany(() => InvestmentEntity, (investment) => investment.id)
  investment: InvestmentEntity[];
}

export default FundEntity;
