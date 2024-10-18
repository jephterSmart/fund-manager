export class RequestFundCommand {
  constructor(
    public readonly fundId: string,
    public readonly investorId: string,
    public readonly amount: number,
  ) {}
}
