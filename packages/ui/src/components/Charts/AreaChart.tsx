import React, { useEffect } from 'react';
import { useChart } from './hooks/useChart';
import { AreaChartProps } from './types';

const AreaChart: React.FC<AreaChartProps> = (props) => {
  const { chart, chartContainerRef, setSeries } = useChart(props);

  useEffect(() => {
    if (chart) {
      setSeries(chart.addAreaSeries(props.seriesOptions));
    }
  }, [chart]);

  return <div ref={chartContainerRef} />;
};

export default AreaChart;
