import { ObjectId, ObjectIdScalar } from '@baggers/api-shared';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ImportResponse {
  @Field(() => [ObjectIdScalar])
  importedIds: ObjectId[];
}
