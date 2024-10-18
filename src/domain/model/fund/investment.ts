import Money from './values/money';

class Investment {
  constructor(
    private readonly _investmentId: string,
    private readonly _businessId: string,
    private _amountInvested: Money,
  ) {}
  get id() {
    return this._investmentId;
  }
  get investmentId() {
    return this._investmentId;
  }
  get businessId() {
    return this._businessId;
  }

  get amountInvested() {
    return this._amountInvested;
  }
}

export default Investment;
