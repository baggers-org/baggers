import { FilterQuery } from 'mongoose';
import { Auth0AccessTokenPayload } from '~/auth';

/**
 * This should be used anywhere we want to find resources where the current user
 * is the owner.
 *
 * The purpose for this, is to provide a single point of refactor later, when we
 * need to support group ownership.
 *
 * @param user
 * @param filterQuery
 * @returns
 */
export function ownerAnd<TModel>(
  user: Auth0AccessTokenPayload,
  filterQuery: FilterQuery<TModel>
): FilterQuery<TModel> {
  return {
    owner: user.sub,
    ...filterQuery,
  };
}
