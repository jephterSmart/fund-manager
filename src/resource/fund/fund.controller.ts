import {
  BadRequestException,
  NotFoundException,
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateFundDTO } from './dto/create-fund.dto';
import { CreateFundCommand } from 'src/application/fund/commands/create-fund.command';
import { AddInvestorDTO } from './dto/add-investor.dto';
import { AddInvestorCommitmentCommand } from 'src/application/fund/commands/add-investor-commitment.command';
import { RequestFundDTO } from './dto/request-fund.dto';
import { RequestFundCommand } from 'src/application/fund/commands/request-fund.command';
import { AcceptPaymentDTO } from './dto/accept-payment.dto';
import { AcceptPaymentCommand } from 'src/application/fund/commands/accept-payment.command';
import { DistributeFundCommand } from 'src/application/fund/commands/distribute-fund.command';
import { DistributeFundDTO } from './dto/distribute-fund.dto';
import { GetFundByIdQuery } from 'src/application/fund/queries/get-fund-by-id.query';
import { GetAllFundsQuery } from 'src/application/fund/queries/get-all-funds.query';

@Controller('funds')
export class FundController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createFund(@Body() dto: CreateFundDTO) {
    const command = new CreateFundCommand(dto.name, dto.targetFundSize);
    let fundId;
    try {
      fundId = await this.commandBus.execute(command);
    } catch (err) {
      throw new BadRequestException(err.message);
    }
    const fund = await this.queryBus.execute(new GetFundByIdQuery(fundId));
    //You can create a fund reader or a transformer
    return fund;
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async getAllFunds() {
    const funds = await this.queryBus.execute(new GetAllFundsQuery());
    //You can create a fund reader or a transformer
    return funds;
  }
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async getFundById(@Param('id') fundId: string) {
    try {
      const fund = await this.queryBus.execute(new GetFundByIdQuery(fundId));
      return fund;
    } catch (err) {
      throw new NotFoundException();
    }
  }

  @Post('investors')
  @HttpCode(HttpStatus.OK)
  async addInvestor(@Body() dto: AddInvestorDTO) {
    const command = new AddInvestorCommitmentCommand(
      dto.fundId,
      dto.investorId,
      dto.commitment,
    );
    try {
      await this.commandBus.execute(command);
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }

  @Post('investors/request')
  async requestFund(@Body() dto: RequestFundDTO) {
    const command = new RequestFundCommand(
      dto.fundId,
      dto.investorId,
      dto.amount,
    );
    try {
      await this.commandBus.execute(command);
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }
  @Post('investors/accept-payment')
  async acceptPayment(@Body() dto: AcceptPaymentDTO) {
    const command = new AcceptPaymentCommand(dto.fundId, dto.investorId);
    try {
      await this.commandBus.execute(command);
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }

  @Post('investments/distribute')
  async distributeFunds(@Body() dto: DistributeFundDTO) {
    const command = new DistributeFundCommand(
      dto.fundId,
      dto.businessId,
      dto.amount,
    );
    try {
      await this.commandBus.execute(command);
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }
}
