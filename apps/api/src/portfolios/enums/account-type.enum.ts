import { registerEnumType } from '@nestjs/graphql';
import { AccountType } from 'plaid';

registerEnumType(AccountType, { name: 'AccountType' });
