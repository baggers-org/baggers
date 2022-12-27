import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import {
  Security,
  SecurityDocument,
} from './entities/security.entity';

@Injectable()
export class SecuritiesService {
  constructor(
    @InjectModel(Security.name)
    private securityModel: Model<SecurityDocument>
  ) {}

  find(filter: FilterQuery<SecurityDocument>) {
    return this.securityModel.find(filter);
  }

  async findById(_id: string) {
    return this.securityModel
      .findById(_id)
      .orFail(
        () =>
          new NotFoundException(
            'Could not find a security with id: ' + _id
          )
      );
  }

  async search(term: string) {
    return this.securityModel
      ?.aggregate([
        {
          $search: {
            index: 'securitySearch',
            autocomplete: {
              path: '_id',
              query: term,
            },
          },
        },
      ])
      .limit(5);
  }
}
