import { registerEnumType } from '@nestjs/graphql';

export enum PortfolioType {
  holdings = 'holdings',
  transactions = 'transactions',
  simulated = 'simulated',
}

registerEnumType(PortfolioType, {
  name: 'PortfolioType',
});
