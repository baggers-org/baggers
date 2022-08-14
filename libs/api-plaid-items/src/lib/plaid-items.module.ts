import { Module } from '@nestjs/common';
import { EnvModule } from '@baggers/api-env';
import { MongooseModule } from '@nestjs/mongoose';

import { PlaidItem, PlaidItemSchema } from './entities/plaid-item.entity';
import { PlaidItemsService } from './plaid-items.service';
import { PlaidClientModule } from '@baggers/plaid-client';

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
