import { ObjectType } from '@nestjs/graphql';

@ObjectType()
export class RemoveMultiple {
  acknowledged: boolean;
  deletedCount: number;
}
