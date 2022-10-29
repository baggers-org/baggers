import { ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Aggregate {
  c?: number;
  h?: number;
  l?: number;
  n?: number;
  o?: number;
  t?: number;
  v?: number;
  vw?: number;
}
