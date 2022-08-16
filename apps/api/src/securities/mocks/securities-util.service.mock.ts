import { ImportedSecurity, Security } from '../entities';

export class SecuritiesUtilServiceMock {
  async importedToBaggersSecurities(
    imported: ImportedSecurity[]
  ): Promise<Map<ImportedSecurity, Security>> {
    return new Map(imported.map((i) => [i, new Security()]));
  }
}
