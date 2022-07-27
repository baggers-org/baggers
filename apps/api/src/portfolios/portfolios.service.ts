import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { Auth0AccessTokenPayload } from 'src/auth/types';
import {
  PortfolioFromDb,
  PortfolioDocument,
  PopulatedPortfolio,
  PopulatedPortfolioWithMetrics,
  PortfolioSummary,
} from './entities/portfolio.entity';
import { populateHoldingTickers } from './pipelines/populate-holding-tickers.pipeline';
import { populateOwner } from './pipelines/populate-owner';
import { HoldingMetricsService, PortfolioMetricsService } from './services';

@Injectable()
export class PortfoliosService {
  constructor(
    @InjectModel(PortfolioFromDb.name)
    private portfolioModel: Model<PortfolioDocument>,
    private portfolioMetricsService: PortfolioMetricsService,
    private holdingMetricsService: HoldingMetricsService,
  ) {}

  initEmpty(currentUser: Auth0AccessTokenPayload) {
    return this.portfolioModel.create({
      owner: currentUser.sub,
    });
  }
  getPortfolioWithMetrics(
    portfolio: PopulatedPortfolio,
  ): PopulatedPortfolioWithMetrics {
    const holdingsWithMetrics =
      this.holdingMetricsService.calculateHoldingMetrics(portfolio);

    return {
      ...portfolio,
      holdings: holdingsWithMetrics,
      totalValue: this.portfolioMetricsService.calculateTotalValue(portfolio),
    };
  }

  async findById(
    _id: mongoose.Types.ObjectId,
    currentUser: Auth0AccessTokenPayload,
  ): Promise<PopulatedPortfolioWithMetrics> {
    const portfolios = await this.portfolioModel.aggregate<PopulatedPortfolio>([
      {
        $match: {
          _id,
          $or: [
            {
              private: false,
            },
            {
              private: true,
              owner: currentUser.sub,
            },
          ],
        },
      },
      ...populateHoldingTickers,
      ...populateOwner,
    ]);

    if (portfolios.length === 0) {
      throw new NotFoundException('Could not find a portfolio with this id');
    }

    return this.getPortfolioWithMetrics(portfolios.pop());
  }

  async findCreated(
    byUser: Auth0AccessTokenPayload,
  ): Promise<PortfolioSummary[]> {
    const portfolios = await this.portfolioModel
      .aggregate<PopulatedPortfolio>([
        {
          $match: {
            owner: byUser.sub,
          },
        },
        ...populateHoldingTickers,
        ...populateOwner,
      ])
      .sort({ updatedAt: -1 });

    const portfoliosWithMetrics = portfolios.map((p) =>
      this.getPortfolioWithMetrics(p),
    );

    return portfoliosWithMetrics.map((p) => ({
      ...p,
      holdings: undefined,
      transactions: undefined,
      top5Holdings: p.holdings.slice(0, 5),
    }));
  }

  async removeOne(
    _id: mongoose.Types.ObjectId,
    currentUser: Auth0AccessTokenPayload,
  ) {
    return this.portfolioModel
      .findOneAndDelete({
        _id,
        owner: currentUser.sub,
      })
      .orFail(
        () => new NotFoundException('Could not find a portfolio with this id'),
      );
  }
}
