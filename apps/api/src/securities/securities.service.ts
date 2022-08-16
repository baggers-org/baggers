import { ObjectId } from '~/shared';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { Security, SecurityDocument } from './entities/security.entity';

@Injectable()
export class SecuritiesService {
  constructor(
    @InjectModel(Security.name) private securityModel: Model<SecurityDocument>
  ) {}

  find(filter: FilterQuery<SecurityDocument>) {
    return this.securityModel.find(filter);
  }

  findById(_id: ObjectId) {
    return this.securityModel.findById(_id);
  }

  search(term: string) {
    return this.securityModel
      ?.aggregate([
        {
          $search: {
            index: `securitySearch`,
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
