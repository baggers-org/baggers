import React, { useEffect } from 'react';
import { useChart } from './hooks/useChart';
import { AreaChartProps } from './types';

export const AreaChart: React.FC<AreaChartProps> = (props) => {
  const { chart, chartContainerRef, setSeries } = useChart(props);

  useEffect(() => {
    if (chart) {
      // eslint-disable-next-line
      setSeries(chart.addAreaSeries(props.seriesOptions));
    }
  }, [chart]);

  return <div ref={chartContainerRef} />;
};
