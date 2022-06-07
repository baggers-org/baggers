import { GetRandomSeriesProps } from '../util';

export interface RandomSeriesChild
  extends Omit<GetRandomSeriesProps, 'maxX' | 'maxY'> {
  width?: number;
  height?: number;
}
