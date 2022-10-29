import { AssetClass } from '@baggers/graphql-types';

export const getSecurityPrice = (
  security: any // I hate this, but because we are using this crappy SDK approach
  // This function cannot be used within the API library, because
  // the Typescript sees the original class versions of Security to be different
  // than this generated class from the graphql-types.
  // Fundamental issue here, nothing we can really do other than ditch the SDK
  // completely re-do how we do typing
): number => {
  if (security?.assetClass === AssetClass.Cash || !security) return 1;
  return security.latestPrice || 0;
};
