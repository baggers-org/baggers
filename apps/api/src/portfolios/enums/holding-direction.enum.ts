import { registerEnumType } from '@nestjs/graphql';

export enum HoldingDirection {
  long = `long`,
  short = `short`,
}

registerEnumType(HoldingDirection, { name: 'HoldingDirection' });
