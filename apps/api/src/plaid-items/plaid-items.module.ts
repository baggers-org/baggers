import { Module } from '@nestjs/common';
import { EnvModule } from '~/env';
import { MongooseModule } from '@nestjs/mongoose';

import {
  PlaidItem,
  PlaidItemSchema,
} from './entities/plaid-item.entity';
import { PlaidItemsService } from './plaid-items.service';
import { PlaidClientModule } from '~/plaid-client';

@Module({
  imports: [
    PlaidClientModule,
    EnvModule,
    MongooseModule.forFeature([
      {
        name: PlaidItem.name,
        schema: PlaidItemSchema,
      },
    ]),
  ],
  providers: [PlaidItemsService],
  exports: [PlaidItemsService],
})
export class PlaidItemsModule {}
