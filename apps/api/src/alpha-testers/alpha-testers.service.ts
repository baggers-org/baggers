import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  AlphaTester,
  AlphaTesterDocument,
} from './entities/alpha-tester.entity';

@Injectable()
export class AlphaTestersService {
  constructor(
    @InjectModel(AlphaTester.name)
    private alphaTesterModel: Model<AlphaTesterDocument>
  ) {}

  async addAlphaTesterEmail(email: string) {
    await this.alphaTesterModel.updateOne(
      {
        _id: email,
      },
      {
        _id: email,
      },
      {
        upsert: true,
        new: true,
      }
    );

    return {
      _id: email,
    };
  }
}
