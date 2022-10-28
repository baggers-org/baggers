import { AssetClass, ImportedSecurity, Security } from '@baggers/graphql-types';
import { isImportedSecurity } from './isImportedSecurity';

export const getSecurityPrice = (
  security: Security | ImportedSecurity
): number => {
  if (security?.assetClass === AssetClass.Cash || !security) return 1;
  if (isImportedSecurity(security)) {
    return security.close_price || 0;
  }
  const { tickerSnapshot: s } = security;

  return s?.min?.c || s?.day?.c || s?.prevDay?.c || 0;
};
