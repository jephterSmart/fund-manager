export class AddInvestorCommitmentCommand {
  constructor(
    public readonly fundId: string,
    public readonly investorId: string,
    public readonly commitment: number,
  ) {}
}
