import { IsNumber, IsString, Min, MinLength } from 'class-validator';

export class AddInvestorDTO {
  @IsString()
  @MinLength(2)
  fundId: string;

  @IsString()
  @MinLength(2)
  investorId: string;

  @IsNumber()
  @Min(0)
  commitment: number;
}
