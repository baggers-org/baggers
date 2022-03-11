import { GraphQLContext } from '@/types/GraphQLContext';
import { MiddlewareFn, ResolverData } from 'type-graphql';

export type OwnerCallback = (data: ResolverData<GraphQLContext>) => boolean;
export function Owner(callback: OwnerCallback): MiddlewareFn<GraphQLContext> {
  return async (data, next) => {
    return callback(data) ? next() : null;
  };
}
