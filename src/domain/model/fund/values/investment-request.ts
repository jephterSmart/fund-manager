import Money from './money';

class InvestmentRequest {
  constructor(
    private readonly investorId: string,
    private readonly amount: Money,
  ) {}
}

export default InvestmentRequest;
