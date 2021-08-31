import { Document, ObjectId } from "mongoose";

export interface ISymbol {
  symbol: string;
  securityName: string;
  isEtf: boolean;
  exchange: string;
  country: string;
  quote: ObjectId | QuoteDocument;
}

export type SymbolDocument = ISymbol & Document<ISymbol> & { quote: ObjectId };
export type SymbolDocumentPopulated = ISymbol &
  Document<ISymbol> & { quote: QuoteDocumentPopulated };

export interface IPortfolio {
  owner: string;
  private: false;
  name: string;
  description: string;
  cash: number;
  totalValue: number;
  positions: Array<ObjectId | PositionDocumentPopulated>;
}

export type PortfolioDocument = IPortfolio &
  Document<IPortfolio> & {
    positions: Array<ObjectId>;
  };
export type PortfolioDocumentPopulated = IPortfolio &
  Document<IPortfolio> & { positions: Array<PositionDocumentPopulated> };
export interface IQuote {
  symbol: ObjectId | SymbolDocument;
  change: number;
  changePercent: number;
  latestPrice: number;
  latestUpdate: number;
  extendedPrice: number;
  extendedUpdate: number;
  volume: number;
  companyName: string;
  primaryExchange: string;
  calculationPrice: string;
  open: number;
  openTime: number;
  openSource: string;
  close: number;
  closeTime: number;
  closeSource: string;
  high: number;
  highTime: number;
  highSource: string;
  low: number;
  lowTime: number;
  lowSource: string;
  latestSource: "Close";
  latestTime: string;
  latestVolume: number;
  iexRealtimePrice: number;
  iexRealtimeSize: number;
  iexLastUpdated: number;
  delayedPrice: number;
  delayedPriceTime: number;
  oddLotDelayedPrice: number;
  oddLotDelayedPriceTime: number;
  extendedChange: number;
  extendedChangePercent: number;
  extendedPriceTime: number;
  previousClose: number;
  previousVolume: number;
  iexMarketPercent: number;
  iexVolume: number;
  avgTotalVolume: number;
  iexBidPrice: number;
  iexBidSize: number;
  iexAskPrice: number;
  iexAskSize: number;
  iexOpen: number;
  iexOpenTime: number;
  iexClose: number;
  iexCloseTime: number;
  marketCap: number;
  peRatio: number;
  week52High: number;
  week52Low: number;
  ytdChange: number;
  lastTradeTime: number;
  isUSMarketOpen: number;
}

export type QuoteDocument = IQuote &
  Document<IQuote> & {
    symbol: ObjectId;
  };
export type QuoteDocumentPopulated = IQuote &
  Document<
    IQuote & {
      symbol: SymbolDocumentPopulated;
    }
  >;

export interface IPosition {
  owner: string;
  portfolio: ObjectId | PortfolioDocumentPopulated;
  symbol: ObjectId | SymbolDocumentPopulated;
  private: boolean;
  exposure: number;
  averagePrice: number;
  marketValue: number;
  costBasis: number;
  brokerFees: number;
  numberOfShares: number;
  profitLossUsd: number;
  profitLossPercent: number;
  dailyProfitLossUsd: number;
  dailyProfitLossPercent: number;
}

export type PositionDocument = IPosition &
  Document<IPosition> & {
    portfolio: ObjectId;
    symbol: ObjectId;
  };

export type PositionDocumentPopulated = IPosition &
  Document<IPosition> & {
    portfolio: PortfolioDocumentPopulated;
    symbol: SymbolDocumentPopulated;
  };
