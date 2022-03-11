import { GraphQLContext } from '@/types/GraphQLContext';
import { createParamDecorator } from 'type-graphql';

export function CurrentUser() {
  return createParamDecorator<GraphQLContext>(({ context }) => context.user);
}
