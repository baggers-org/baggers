import { Security, ImportedSecurity } from '@baggers/graphql-types';

export function isImportedSecurity(
  security: Security | ImportedSecurity
): security is ImportedSecurity {
  if (
    security.isImported ||
    (security as ImportedSecurity).ticker_symbol
  )
    return true;

  return false;
}
