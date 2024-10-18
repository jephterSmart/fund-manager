import { AcceptPaymentCommand } from './commands/accept-payment.command';
import { AcceptPaymentHandler } from './commands/accept-payment.handler';
import { AddInvestorCommitmentCommand } from './commands/add-investor-commitment.command';
import { AddInvestorCommitmentHandler } from './commands/add-investor-commitment.handler';
import { CreateFundCommand } from './commands/create-fund.command';
import { CreateFundHandler } from './commands/create-fund.handler';
import { DistributeFundCommand } from './commands/distribute-fund.command';
import { DistributeFundHandler } from './commands/distribute-fund.handler';
import { GetFundByIdHandler } from './queries/get-fund-by-id.handler';
import { GetFundByIdQuery } from './queries/get-fund-by-id.query';
import { RequestFundCommand } from './commands/request-fund.command';
import { RequestFundHandler } from './commands/request-fund.handler';
import { GetAllFundsQuery } from './queries/get-all-funds.query';
import { GetAllFundsHandler } from './queries/get-all-funds.handler';

export const fundProviders = [
  CreateFundCommand,
  CreateFundHandler,
  AddInvestorCommitmentCommand,
  AddInvestorCommitmentHandler,
  RequestFundCommand,
  RequestFundHandler,
  AcceptPaymentCommand,
  AcceptPaymentHandler,
  DistributeFundCommand,
  DistributeFundHandler,
  GetFundByIdQuery,
  GetFundByIdHandler,
  GetAllFundsQuery,
  GetAllFundsHandler,
];
