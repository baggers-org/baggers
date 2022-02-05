import { ISeriesApi, SeriesType } from 'lightweight-charts';
import { useState } from 'react';
import {
  useApplyOptions,
  useHandleResize,
  useSeriesUpdates,
  useSetupChart,
} from '.';
import { ChartProps } from '../types';

export const useChart = (props: ChartProps) => {
  const { chartContainerRef, chart } = useSetupChart(props);
  const [series, setSeries] = useState<ISeriesApi<SeriesType>>();

  useHandleResize(chartContainerRef.current, chart, props);
  useApplyOptions(chart, props);
  useSeriesUpdates(props, series);

  return {
    chart,
    chartContainerRef,
    series,
    setSeries,
  };
};
