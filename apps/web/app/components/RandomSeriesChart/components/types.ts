import { GetRandomSeriesProps } from '../util';

export interface RandomSeriesChild
  extends Omit<GetRandomSeriesProps, 'maxX' | 'maxY'> {
  id?: string;
  width?: number;
  height?: number;

  animate: {
    duration: number;
  };
}
