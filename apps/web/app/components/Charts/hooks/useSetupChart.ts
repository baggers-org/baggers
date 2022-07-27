import { useEffect, useRef, useState } from 'react';
import { IChartApi } from 'lightweight-charts';
import { BaseChartProps } from '../types';

export const useSetupChart = (props: BaseChartProps) => {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const [chart, setChart] = useState<IChartApi | null>(null);

  useEffect(() => {
    const setup = async () => {
      if (!chartContainerRef.current || chart || typeof window === `undefined`)
        return;
      const { createChart } = await import(`lightweight-charts`);

      if (chartContainerRef.current.hasChildNodes()) {
        const child = chartContainerRef.current.childNodes[0];
        chartContainerRef.current.removeChild(child);
      }
      setChart(createChart(chartContainerRef.current, props.options));
    };
    setup();
  }, [chartContainerRef, props.options]);

  return {
    chartContainerRef,
    chart,
  };
};
