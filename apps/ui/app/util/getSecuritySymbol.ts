import { ImportedSecurity, Security } from '@baggers/graphql-types';
import { isImportedSecurity } from '@baggers/security-util';

export const getSecuritySymbol = (
  security: Security | ImportedSecurity
): string => {
  if (isImportedSecurity(security)) {
    return security.ticker_symbol || security.name || 'Unknown';
  }
  if (security._id) return security._id;

  return security.name || 'Unknown';
};
