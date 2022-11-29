import React, { useEffect } from 'react';
import { HTMLProps } from '../../util/html-props';
import { useChart } from './hooks/use-chart';
import { AreaChartProps } from './types';

export const AreaChart: React.FC<
  AreaChartProps & HTMLProps<HTMLDivElement>
> = (props) => {
  const { chart, chartContainerRef, setSeries } = useChart(props);

  useEffect(() => {
    if (chart) {
      // eslint-disable-next-line
      setSeries(chart.addAreaSeries(props.seriesOptions));
    }
  }, [chart]);

  return (
    <div
      ref={chartContainerRef}
      className={props.className}
      style={{ overflow: 'hidden' }}
    />
  );
};
