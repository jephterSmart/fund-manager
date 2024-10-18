export class DistributeFundCommand {
  constructor(
    public readonly fundId: string,
    public readonly businessId: string,
    public readonly amount: number,
  ) {}
}
