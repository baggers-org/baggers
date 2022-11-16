import { ITickerDetails } from '@polygon.io/client-js';
import { SnapshotInfo } from '@polygon.io/client-js/lib/rest/stocks/snapshots';

export type PolygonTicker = Required<ITickerDetails>['results'];
export type PolygonTickerSnapshot = SnapshotInfo;
