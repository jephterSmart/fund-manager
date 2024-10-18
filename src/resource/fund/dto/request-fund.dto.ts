import { IsNumber, IsString, Min, MinLength } from 'class-validator';

export class RequestFundDTO {
  @IsString()
  @MinLength(2)
  fundId: string;

  @IsString()
  @MinLength(2)
  investorId: string;

  @IsNumber()
  @Min(0)
  amount: number;
}
