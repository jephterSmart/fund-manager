export class CreateFundCommand {
  constructor(
    public readonly name: string,
    public readonly targetFundSize: number,
  ) {}
}
