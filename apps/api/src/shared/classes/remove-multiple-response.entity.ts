import { ObjectType } from '@nestjs/graphql';

@ObjectType()
export class RemoveMultipleResponse {
  acknowledged: boolean;
  deletedCount: number;
}
