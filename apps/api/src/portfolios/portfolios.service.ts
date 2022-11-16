import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UpdatePortfolioInput } from './dto/update-portfolio.input';
import {
  PortfolioDocument,
  PopulatedPortfolioWithMetrics,
  PortfolioSummary,
  Portfolio,
  PopulatedPortfolio,
} from './entities/portfolio.entity';
import {
  HoldingMetricsService,
  PortfolioMetricsService,
} from './services';
import { Auth0AccessTokenPayload } from '~/auth';
import { ObjectId, RemoveMultipleResponse } from '~/shared';

@Injectable()
export class PortfoliosService {
  constructor(
    @InjectModel(Portfolio.name)
    private portfolioModel: Model<PortfolioDocument>,
    private portfolioMetricsService: PortfolioMetricsService,
    private holdingMetricsService: HoldingMetricsService
  ) {}

  initEmpty(currentUser: Auth0AccessTokenPayload) {
    return this.portfolioModel.create({
      owner: currentUser.sub,
    });
  }

  insertMany(portfolios: Portfolio[]) {
    return this.portfolioModel.insertMany(portfolios);
  }

  getPortfolioWithMetrics(
    portfolio: PopulatedPortfolio
  ): PopulatedPortfolioWithMetrics {
    const holdingsWithMetrics =
      this.holdingMetricsService.calculateHoldingMetrics(portfolio);

    return {
      ...portfolio,
      holdings: holdingsWithMetrics.sort((h1, h2) =>
        h1.marketValue > h2.marketValue ? -1 : 1
      ),
      cash: this.portfolioMetricsService.calculateCash(portfolio),
      totalValue:
        this.portfolioMetricsService.calculateTotalValue(portfolio),
    };
  }

  async findById(
    _id: ObjectId,
    currentUser: Auth0AccessTokenPayload
  ): Promise<PopulatedPortfolioWithMetrics> {
    const portfolio = await this.portfolioModel
      .findOne<PopulatedPortfolio>({
        _id,
        $or: [
          {
            private: false,
          },
          {
            private: true,
            owner: currentUser?.sub,
          },
        ],
      })
      .orFail(
        () =>
          new NotFoundException(
            'Could not find a portfolio with this id'
          )
      )
      .populate({
        path: 'holdings',
        populate: { path: 'security', model: 'Security' },
      })
      .populate({
        path: 'transactions',
        populate: { path: 'security', model: 'Security' },
      })
      .populate('owner')
      .lean();

    const portfolioWithMetrics =
      this.getPortfolioWithMetrics(portfolio);

    return portfolioWithMetrics;
  }

  async findCreated(
    byUser: Auth0AccessTokenPayload
  ): Promise<PortfolioSummary[]> {
    const portfolios = await this.portfolioModel
      .find<PopulatedPortfolio>({
        owner: byUser.sub,
      })
      .populate({
        path: 'holdings',
        populate: { path: 'security', model: 'Security' },
      })
      .populate('owner')
      .sort({ updatedAt: -1 })
      .lean();

    const portfoliosWithMetrics = portfolios.map((p) =>
      this.getPortfolioWithMetrics(p)
    );

    return portfoliosWithMetrics.map((p) => ({
      ...p,
      holdings: undefined,
      transactions: undefined,
      top5Holdings: p.holdings.slice(0, 5),
    }));
  }

  async removeOne(
    _id: ObjectId,
    currentUser: Auth0AccessTokenPayload
  ) {
    return this.portfolioModel
      .findOneAndDelete({
        _id,
        owner: currentUser.sub,
      })
      .orFail(
        () =>
          new NotFoundException(
            'Could not find a portfolio with this id'
          )
      );
  }

  async removeMultiple(
    _ids: ObjectId[],
    currentUser: Auth0AccessTokenPayload
  ): Promise<RemoveMultipleResponse> {
    return this.portfolioModel
      .remove({
        owner: currentUser.sub,
        _id: {
          $in: _ids,
        },
      })
      .orFail(
        () =>
          new NotFoundException(
            'Could not find any portfolios to delete'
          )
      );
  }

  async updateOne(
    _id: ObjectId,
    input: UpdatePortfolioInput,
    currentUser: Auth0AccessTokenPayload
  ) {
    return this.portfolioModel
      .findOneAndUpdate(
        {
          _id,
          owner: currentUser.sub,
        },
        {
          $set: { ...input, updatedAt: new Date() },
        },
        { returnDocument: 'after' }
      )
      .orFail(
        () =>
          new NotFoundException(
            'Could not find a portfolio with this id'
          )
      );
  }
}
