import {
  AssetClass,
  Security,
  TickerType,
} from '@baggers/graphql-types';

export abstract class MarketDataMapper {
  abstract mapSecurity<TSourceSecurity>(
    source: TSourceSecurity
  ): Security;

  abstract mapAssetClass(source: string): AssetClass;

  abstract mapTickerType(source: string): TickerType;
}
