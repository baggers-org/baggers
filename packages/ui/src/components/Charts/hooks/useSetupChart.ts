import { useEffect, useRef, useState } from 'react';
import {
  ISeriesApi,
  IChartApi,
  SeriesType,
  createChart,
} from 'lightweight-charts';
import { BaseChartProps } from '../types';

export const useSetupChart = (props: BaseChartProps) => {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const [chart, setChart] = useState<IChartApi | null>(null);

  useEffect(() => {
    if (!chartContainerRef.current || chart) return;

    setChart(createChart(chartContainerRef.current, props.options));
  }, [chartContainerRef.current, chart]);

  return {
    chartContainerRef,
    chart,
  };
};
