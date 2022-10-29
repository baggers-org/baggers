import { Injectable } from '@nestjs/common';
import { FilterQuery } from 'mongoose';
import { OpenFigiMappingResponse, OpenFigiService } from '~/open-figi';
import { ImportedSecurity, SecurityDocument } from './entities';
import { SecuritiesService } from './securities.service';
import { SecurityMap } from './types';

@Injectable()
export class SecuritiesUtilService {
  constructor(
    private openFigiService: OpenFigiService,
    private securitiesService: SecuritiesService
  ) {}

  /**
   *
   * Given a list of ImportedSecurities - will match them to securities in our database
   * using the OpenFIGI API.
   *
   * Handles multiple failure conditions with a last resort lookup to our database directly
   */
  async importedToBaggersSecurities(
    imported: ImportedSecurity[]
  ): Promise<SecurityMap> {
    const uniqImported = [
      ...new Map(imported.map((i) => [i.security_id, i])).values(),
    ];

    let figiMap: OpenFigiMappingResponse;

    try {
      ({ data: figiMap } = await this.openFigiService.getFigiMapping(
        uniqImported
      ));
    } catch (e) {
      console.error('OpenFIGI is unavailable');
      console.error(e);
    }

    const lookupMap: Map<ImportedSecurity, { figi?: string; symbol?: string }> =
      new Map(
        uniqImported.map((security, index) => [
          security,
          {
            figi: figiMap?.[index]?.data?.[0]?.figi,
            symbol: security.ticker_symbol,
          },
        ])
      );

    const lookup = [...lookupMap.values()];
    const figis = lookup.filter((lookup) => lookup.figi).map((l) => l.figi);
    const symbols = lookup
      .filter((lookup) => lookup.symbol)
      .map((l) => l.symbol);

    // Send all figis and symbols to the DB and see what comes back
    const query: FilterQuery<SecurityDocument> = {
      $or: [
        {
          figi: {
            $in: figis,
          },
        },
        {
          _id: {
            $in: symbols,
          },
        },
      ],
    };

    const matchedSecurities = await this.securitiesService.find(query);

    return new Map(
      uniqImported.map((imported) => {
        // Use the lookup map to work backwards and link up the securities
        const { figi, symbol } = lookupMap.get(imported);
        return [
          imported.security_id,
          matchedSecurities.find(
            (security) => security.figi === figi || security._id === symbol
          ),
        ];
      })
    );
  }
}
