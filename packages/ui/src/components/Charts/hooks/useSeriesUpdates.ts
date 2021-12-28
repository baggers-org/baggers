import { ISeriesApi, SeriesType } from 'lightweight-charts';
import { useEffect } from 'react';
import { ChartProps } from '../types';

export const useSeriesUpdates = <TSeries extends SeriesType>(
  props: ChartProps,
  series?: ISeriesApi<TSeries>,
) => {
  useEffect(() => {
    if (series) {
      series.setData(props.data);
    }
  }, [series, props.data]);
};
