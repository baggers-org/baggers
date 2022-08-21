import { registerEnumType } from '@nestjs/graphql';

export enum AscDesc {
  asc = 'asc',
  desc = 'desc',
}

registerEnumType(AscDesc, { name: 'AscDesc' });
