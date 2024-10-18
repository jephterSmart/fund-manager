import { Column, Entity } from 'typeorm';
import BaseEntity from '../base.entity';

@Entity({ name: 'investor' })
export class InvestorEntity extends BaseEntity {
  @Column()
  investorId: string;

  @Column()
  fundId: string; // Foreign key to Fund

  @Column()
  commitment: number;

  @Column({ default: 0 })
  amountRequested: number = 0;

  @Column({ default: 0 })
  amountCollected: number = 0;
}
