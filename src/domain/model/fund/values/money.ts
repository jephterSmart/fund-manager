class Money {
  private static decimal: number = 2; // minimum denomination

  constructor(
    private readonly amount: number,
    private readonly currency: string,
  ) {}

  add(money: Money) {
    // Again, we can normalise here to USD
    return new Money(this.amount + money.amount, money.currency);
  }
  subtract(money: Money) {
    return new Money(this.amount - money.amount, money.currency);
  }
  static parse(value: string) {
    const match = value.match(/[a-zA-Z]*[0-9\.]*$/i);
    if (!match) throw new Error('Not a valid money');
    const parts = value.match(/([a-zA-Z]*)([0-9\.]*)$/i);
    const currency = parts[1];
    const amount = parts[2];
    if (!parseFloat(amount)) throw new Error('Not a valid money');
    return new Money(parseFloat(amount) * 10 ** Money.decimal, currency);
  }
  valueOf() {
    // Can implement equality of money, say we normalize all currency to USD cents
    return this.amount;
  }
  [Symbol.toPrimitive]() {
    // Same thing as valueOf
    return this.amount;
  }
}

export default Money;
