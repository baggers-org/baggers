import { Portfolio, Position } from "./collections";

Position.schema.index({ portfolio: 1 });
Position.schema.index({ exposure: 1 });
Position.schema.index({ averagePrice: 1 });
Position.schema.index({ marketValue: 1 });
Position.schema.index({ costBasis: 1 });
Position.schema.index({ brokerFees: 1 });
Position.schema.index({ numberOfShares: 1 });
Position.schema.index({ profitLossUsd: 1 });
Position.schema.index({ profitLossPercent: 1 });
Position.schema.index({ dailyProfitLossUsd: 1 });
Position.schema.index({ dailyProfitLossPercent: 1 });

Portfolio.schema.index({ owner: 1 });
