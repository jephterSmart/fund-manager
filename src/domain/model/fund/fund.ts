import { AggregateRoot } from '@nestjs/cqrs';
import Money from './values/money';
import Investor from './investor';
import Investment from './investment';
import Commitment from './values/commitment';

export class Fund extends AggregateRoot {
  private _totalCommitments: Money = new Money(0, 'USD');
  private _totalCollected: Money = new Money(0, 'USD');
  private _totalDistributed: Money = new Money(0, 'USD');
  private _investors: Investor[] = [];
  private _investments: Investment[] = [];

  constructor(
    private readonly fundId: string,
    private _name: string,
    private _targetFundSize: Money,
  ) {
    super();
  }

  addInvestorCommitment(investorId: string, commitment: number): void {
    const newTotalCommitment = +this._totalCommitments + commitment;
    if (+newTotalCommitment > +this.targetFundSize) {
      throw new Error('Total commitments exceed target fund size');
    }
    const investorIndx = this._investors.findIndex(
      (el) => el.investorId === investorId,
    );
    const investorExists = investorIndx >= 0;
    let investor: Investor;
    if (investorExists) {
      investor = this._investors[investorIndx];
      investor.setCommitment(
        new Commitment(
          new Money(+investor.getCommitment().amount, 'USD').add(
            new Money(commitment, 'USD'),
          ),
        ),
      );
    } else {
      investor = new Investor(
        investorId,
        new Commitment(new Money(commitment, 'USD')),
      );
      this._investors.push(investor);
    }

    this._totalCommitments = this._totalCommitments.add(
      new Money(commitment, 'USD'),
    );
  }

  requestFund(investorId: string, amount: Money): void {
    const newTotalCollected = this._totalCollected.add(amount);
    if (this._totalCommitments < newTotalCollected) {
      throw new Error('Total collected can not be greater than committed');
    }
    const investor = this._investors.find(
      (inv) => inv.investorId === investorId,
    );
    if (!investor) {
      throw new Error('Investor not found');
    }

    investor.requestAmount(amount);
  }

  confirmInvestorPayment(investorId: string) {
    const investorInd = this._investors.findIndex(
      (inv) => inv.investorId === investorId,
    );
    if (investorInd < 0) {
      throw new Error('Investor not found');
    }
    const investor = this._investors[investorInd];
    const investorRequest = investor.getAmountRequested();
    investor.confirmRequest();

    this._investors.splice(investorInd, 1, investor);
    this._totalCollected = this._totalCollected.add(investorRequest);
  }

  distributeFunds(businessId: string, amount: Money): void {
    const newDistributed = this._totalDistributed.add(amount);
    if (newDistributed > this._totalCollected) {
      throw new Error('Insufficient collected funds');
    }
    this._investments.push(
      new Investment(this.fundId + '-' + businessId, businessId, amount),
    );
    this._totalDistributed = this._totalDistributed.add(amount);
  }

  set name(name: string) {
    this._name = name;
  }
  get name() {
    return this._name;
  }
  get id() {
    return this.fundId;
  }

  set investors(_investors: Investor[]) {
    this._investors = _investors;
  }
  get investors() {
    return this._investors;
  }

  set investments(_investments: Investment[]) {
    this._investments = _investments;
  }
  get investments() {
    return this._investments;
  }

  set targetFundSize(fundSize: Money) {
    this._targetFundSize = fundSize;
  }
  get targetFundSize() {
    return this._targetFundSize;
  }
  set totalCommitments(commitments: Money) {
    this._totalCommitments = commitments;
  }
  get totalCommitments() {
    return this._totalCommitments;
  }

  set totalCollected(collected: Money) {
    this._totalCollected = collected;
  }
  get totalCollected() {
    return this._totalCollected;
  }

  set totalDistributed(distributed: Money) {
    this._totalDistributed = distributed;
  }
  get totalDistributed() {
    return this._totalDistributed;
  }
}
