import { Holding, HoldingSource, Symbol, SymbolModel } from '@/db/entities';
import { openFigiFetch, OpenFigiResponse } from '@/open-figi/open-figi';
import { FlatHolding } from './types';

type PlaidHolding = FlatHolding;
type PlaidSecurity = FlatHolding['security'];

const getOpenFigiInput = (security: PlaidSecurity) => {
  if (!security) return null;
  const { isin, cusip, sedol } = security;

  let idType, idValue;
  if (!isin && !cusip && !sedol) {
    return null;
  }

  if (isin) {
    idType = `ID_ISIN`;
    idValue = isin;
  }
  if (cusip) {
    idType = `ID_CUSIP`;
    idValue = cusip;
  }
  if (sedol) {
    idType = `ID_SEDOL`;
    idValue = sedol;
  }

  return {
    idType,
    idValue,
  };
};

export const plaidHoldingsToBaggersHoldings = async (input: PlaidHolding[]) => {
  let securityMap = input.map((holding) => ({
    plaidHolding: holding,
    baggersHolding: {} as Partial<Holding>,
    figiInput: getOpenFigiInput(holding.security),
    figiResult: {} as OpenFigiResponse[number] | undefined,
    lookupFigis: [''],
    lookupSymbol: '',
  }));

  const openFigiResponse = await openFigiFetch(`/mapping`, {
    method: `post`,
    body: JSON.stringify(securityMap.map((s) => s.figiInput)),
  });
  if (!openFigiResponse.ok) {
    console.error(
      'Response from openfigi.com/api ',
      openFigiResponse.status,
      openFigiResponse.statusText,
    );
  }

  const openFigiResults = openFigiResponse.ok
    ? ((await openFigiResponse.json()) as OpenFigiResponse)
    : null;

  securityMap = securityMap.map((mapping, index) => ({
    ...mapping,
    figiResult: openFigiResults?.[index],
  }));

  securityMap = securityMap.map((mapper) => {
    if (mapper.figiResult?.data) {
      return {
        ...mapper,
        lookupFigis: mapper.figiResult?.data?.map((d) => d.figi) || '',
      };
    }
    console.log(
      'OpenFIGI unavailable, using symbol search for ',
      mapper.plaidHolding.security?.ticker_symbol,
    );

    return {
      ...mapper,
      lookupSymbol: mapper.plaidHolding.security?.ticker_symbol || '',
    };
  });

  const symbols = await SymbolModel.find({
    $or: [
      {
        symbol: {
          $in: securityMap
            .filter((s) => s.lookupSymbol)
            .map((s) => s.lookupSymbol),
        },
      },
      {
        figi: {
          $in: securityMap
            .filter((s) => s.lookupFigis?.length)
            .flatMap((s) => s.lookupFigis),
        },
      },
    ],
  });

  securityMap = securityMap.map((s) => {
    const symbol = s.lookupFigis[0]
      ? symbols.find((symbol) => s.lookupFigis.includes(symbol.figi as never))
      : (symbols.find((symbol) => symbol.symbol === s.lookupSymbol) as Symbol);

    return {
      ...s,
      baggersHolding: {
        costBasis: s.plaidHolding.cost_basis,
        type: 'shares',
        quantity: s.plaidHolding.quantity,
        currency: s.plaidHolding.iso_currency_code,
        source: HoldingSource.broker,
        averagePrice:
          (s.plaidHolding.cost_basis || 0) / s.plaidHolding.quantity,
        symbol,
      } as Holding,
    };
  });

  return {
    holdings: securityMap
      .filter((s) => s.baggersHolding.symbol)
      .map((s) => s.baggersHolding),
    missing: securityMap
      .filter((s) => !s.baggersHolding.symbol)
      .map((s) => s.plaidHolding),
  };
};
