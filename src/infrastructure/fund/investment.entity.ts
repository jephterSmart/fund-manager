import { Column, Entity } from 'typeorm';
import BaseEntity from '../base.entity';

@Entity({ name: 'investment' })
export class InvestmentEntity extends BaseEntity {
  @Column({ unique: true })
  investmentId: string;

  @Column()
  fundId: string; // Foreign key to Fund

  @Column()
  businessId: string;

  @Column()
  amountInvested: number;
}
