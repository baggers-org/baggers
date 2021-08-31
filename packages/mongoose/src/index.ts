import { getDbConnection, initSchema } from "./mongoose";
import {
  updatePositionMetrics,
  updatePositionMetricsBatch,
  updateSymbolQuote,
  updateSymbolQuoteBatch,
  calculatePositionMetrics,
  calculateDailyProfitLossUsd,
  calculateMarketValue,
  calculateProfitLossPercent,
  calculateProfitLossUsd,
} from "./marketDataFunctions";

import {
  PortfolioDocument,
  PortfolioDocumentPopulated,
  PositionDocument,
  PositionDocumentPopulated,
  QuoteDocument,
  QuoteDocumentPopulated,
  SymbolDocument,
  SymbolDocumentPopulated,
} from "./mongoose/interfaces";
import { models } from "./mongoose/index";

export * from "mongoose";

export type {
  PortfolioDocument,
  PortfolioDocumentPopulated,
  PositionDocument,
  PositionDocumentPopulated,
  QuoteDocument,
  QuoteDocumentPopulated,
  SymbolDocument,
  SymbolDocumentPopulated,
};
/**
 * Access the baggers db via mongoose utility functions and middleware
 * # Set up
 * Call `init` before anything else
 *
 * @example
 * ```
 * await BaggersMongoose.init()
 * const symbolsCursor = BaggersMongoose.Symbols.find();
 * const symbolIds = [];
 * symbolsCursor.forEach(symbol => symbolIds.push(symbol._id))
 *
 * BaggersMongoose.marketDataFunctions.updateSymbolQuoteBatch(symbolIds)
 * ```
 */

export const BaggersMongoose = {
  marketDataFunctions: {
    updateSymbolQuote,
    updateSymbolQuoteBatch,
    updatePositionMetricsBatch,
    updatePositionMetrics,
    calculatePositionMetrics,
    calculateDailyProfitLossUsd,
    calculateMarketValue,
    calculateProfitLossPercent,
    calculateProfitLossUsd,
  },
  models,
  init: async (clusterURI: string) => {
    const conn = await getDbConnection(clusterURI);
    await initSchema(conn);
    return conn;
  },
};
