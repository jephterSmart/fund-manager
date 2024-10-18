import { IsNumber, IsString, Min, MinLength } from 'class-validator';

export class DistributeFundDTO {
  @IsString()
  @MinLength(2)
  fundId: string;
  @IsString()
  @MinLength(2)
  businessId: string;
  @IsNumber()
  @Min(0)
  amount: number;
}
