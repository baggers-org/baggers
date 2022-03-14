import { AccessClaim } from './AccessClaim';

export interface GraphQLContext {
  user: AccessClaim;
}
