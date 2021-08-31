import { Position } from '@/graphql/Mutations.document.gql';
import { TableProperties } from '../BaggersTable/BaggersTableTypes';

export const DEFAULT_POSITION_PROPERTIES: TableProperties<Position> = [
  {
    id: `symbol.symbol`,
    sortKey: `SYMBOL_SYMBOL`,
    label: `Symbol`,
    renderCell: (pos) => <span>{pos.symbol?.symbol}</span>,
  },
  {
    id: `numberOfShares`,
    sortKey: `NUMBER_OF_SHARES`,
    key: `numberOfShares`,
    label: `No. Shares`,
  },
  {
    id: `costBasis`,
    sortKey: `COST_BASIS`,
    key: `costBasis`,
    label: `Cost Basis`,
  },
  {
    id: `marketValue`,
    sortKey: `MARKET_VALUE`,
    key: `marketValue`,
    label: `Mkt. Value`,
  },
  // {
  //   id: `exposure`,
  //   sortKey: `EXPOSURE`,
  //   key: `exposure`,
  //   label: `Exposure`,
  // },
  {
    id: `averagePrice`,
    sortKey: `AVERAGE_PRICE`,
    key: `averagePrice`,
    label: `Average Price ($)`,
  },
  {
    id: `symbol.quote.latestPrice`,
    sortKey: `SYMBOL_QUOTE_LATEST_PRICE`,
    label: `Price`,
    renderCell: (pos) => <span>{pos.symbol?.quote?.latestPrice}</span>,
  },
  {
    id: `profitLossPercent`,
    sortKey: `PROFIT_LOSS_PERCENT`,
    key: `profitLossPercent`,
    label: `P/L (%)`,
  },
  {
    id: `dailyProfitLossUsd`,
    sortKey: `PROFIT_LOSS_USD`,
    key: `dailyProfitLossUsd`,
    label: `Daily P/L ($)`,
  },
];
