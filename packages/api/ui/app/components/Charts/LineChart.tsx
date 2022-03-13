import React, { useEffect } from "react";
import { useChart } from "./hooks/useChart";
import { LineChartProps } from "./types";

const LineChart: React.FC<LineChartProps> = (props) => {
  const { chart, chartContainerRef, setSeries } = useChart(props);

  useEffect(() => {
    if (chart) {
      setSeries(chart.addLineSeries(props.seriesOptions));
    }
  }, [chart]);

  return <div ref={chartContainerRef} />;
};

export default LineChart;
