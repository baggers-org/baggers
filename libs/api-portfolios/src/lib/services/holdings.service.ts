import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PortfolioDocument, PortfolioFromDb } from '../entities';

@Injectable()
export class HoldingsService {
  constructor(
    @InjectModel(PortfolioFromDb.name)
    private portfolioModel: Model<PortfolioDocument>
  ) {}
}
