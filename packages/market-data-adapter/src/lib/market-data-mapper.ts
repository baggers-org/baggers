import { AssetClass, TickerType } from '@baggers/graphql-types';
import { SecurityDetails, SecuritySnapshot } from './types';

export abstract class MarketDataMapper<
  TSecurityDetails,
  TSecuritySnapshot
> {
  abstract mapSecurityDetails(
    source: TSecurityDetails
  ): SecurityDetails;

  abstract mapSecuritySnapshot(
    source: TSecuritySnapshot
  ): SecuritySnapshot;

  abstract mapAssetClass(source: string): AssetClass;

  abstract mapTickerType(source: string): TickerType;
}
