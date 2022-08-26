import { ObjectType } from '@nestjs/graphql';

@ObjectType()
export class UpdateResponse {
  updatedCount: number;
}
