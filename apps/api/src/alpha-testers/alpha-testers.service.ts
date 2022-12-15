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

  addAlphaTesterEmail(email: string) {
    return this.alphaTesterModel.create({
      _id: email,
    });
  }
}
