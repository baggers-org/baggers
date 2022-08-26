import { Security, ImportedSecurity } from '@baggers/sdk';

export function isImportedSecurity(
  security: Security | ImportedSecurity
): security is ImportedSecurity {
  if (security.close_price || (security as ImportedSecurity).ticker_symbol)
    return true;

  return false;
}
