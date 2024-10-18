import { IsNumber, IsString, Min, MinLength } from 'class-validator';

export class CreateFundDTO {
  @IsString()
  @MinLength(2)
  name: string;

  @IsNumber()
  @Min(0)
  targetFundSize: number;
}
