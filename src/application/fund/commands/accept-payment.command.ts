export class AcceptPaymentCommand {
  constructor(
    public readonly fundId: string,
    public readonly investorId: string,
  ) {}
}
