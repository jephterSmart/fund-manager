import Commitment from './values/commitment';
import Money from './values/money';

class Investor {
  private amountRequested: Money = new Money(0, 'USD');

  constructor(
    private readonly _investorId: string,
    private commitment: Commitment,
    private collectedAmount: Money = new Money(0, 'USD'),
    amountRequested?: Money,
  ) {
    if (amountRequested) {
      this.amountRequested = amountRequested;
    }
  }

  requestAmount(amount: Money): void {
    if (+amount <= 0) {
      throw new Error('Request value must be greater than zero');
    }
    if (+this.amountRequested !== 0) {
      throw new Error('There is a pending request yet to be fulfilled');
    }
    if (
      new Commitment(this.collectedAmount.add(amount)).exceeds(this.commitment)
    ) {
      throw new Error('Request exceeds committed amount');
    }
    this.amountRequested = amount;
  }

  confirmRequest(): void {
    if (+this.amountRequested === 0) {
      throw new Error('There is no request yet.');
    }
    this.collectedAmount = this.collectedAmount.add(this.amountRequested);
    this.amountRequested = new Money(0, 'USD');
  }

  getCommitment(): Commitment {
    return this.commitment;
  }
  setCommitment(commitment: Commitment) {
    this.commitment = commitment;
  }

  getAmountRequested(): Money {
    return this.amountRequested;
  }

  getAmountCollected(): Money {
    return this.collectedAmount;
  }

  get investorId() {
    return this._investorId;
  }
}

export default Investor;
