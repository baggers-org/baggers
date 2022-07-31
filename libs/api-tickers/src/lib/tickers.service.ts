import { ObjectId } from '@baggers/api-shared';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Ticker, TickerDocument } from './entities/ticker.entity';

@Injectable()
export class TickersService {
  constructor(
    @InjectModel(Ticker.name) private tickerModel: Model<TickerDocument>
  ) {}

  findById(_id: ObjectId) {
    return this.tickerModel.findById(_id);
  }

  search(term: string) {
    return this.tickerModel
      ?.aggregate([
        {
          $search: {
            index: `tickersSearch`,
            text: {
              query: term,
              path: `symbol`,
            },
          },
        },
      ])
      .limit(5);
  }
}
