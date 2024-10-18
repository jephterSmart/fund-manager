import Money from './money';

class Commitment {
  constructor(private readonly _amount: Money) {}

  exceeds(other: Commitment): boolean {
    return +this.amount > +other.amount;
  }
  get amount() {
    return this._amount;
  }
}

export default Commitment;
