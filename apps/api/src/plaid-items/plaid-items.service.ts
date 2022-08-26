import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePlaidItemInput } from './dto/create-plaid-item.input';
import { InjectModel } from '@nestjs/mongoose';
import { PlaidItem, PlaidItemDocument } from './entities';
import { Model } from 'mongoose';
import { PlaidClientService } from '~/plaid-client';
import { Auth0AccessTokenPayload } from '~/auth';

@Injectable()
export class PlaidItemsService {
  constructor(
    @InjectModel(PlaidItem.name)
    private plaidItemsModel: Model<PlaidItemDocument>,
    private plaid: PlaidClientService
  ) {}

  create(input: CreatePlaidItemInput, currentUser: Auth0AccessTokenPayload) {
    return this.plaidItemsModel.create({
      ...input,
      owner: currentUser.sub,
    });
  }

  async findById(id: string) {
    return this.plaidItemsModel
      .findById(id)
      .orFail(
        () => new NotFoundException('Could not find an item with this id')
      );
  }
}
