import { ImportedSecurity, Security } from '@baggers/sdk';
import { isImportedSecurity } from '@baggers/type-util';

export const getSecuritySymbol = (
  security: Security | ImportedSecurity
): string => {
  if (isImportedSecurity(security)) {
    return security.ticker_symbol || security.name || 'Unknown';
  }
  if (security.symbol) return security.symbol;

  return security.name || 'Unknown';
};
