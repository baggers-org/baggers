import { registerEnumType } from '@nestjs/graphql';

export enum HoldingType {
  shares = `shares`,
  puts = `puts`,
  calls = `calls`,
}

registerEnumType(HoldingType, {
  name: 'HoldingType',
});
