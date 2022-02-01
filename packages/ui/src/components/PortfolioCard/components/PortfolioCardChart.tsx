import { AreaChart } from '@/components';
import { useTheme } from '@mui/material';
import { alpha } from '@mui/system';
import { useState } from 'react';

const POINTS = [
  { time: `2018-12-22`, value: 32.51 },
  { time: `2018-12-23`, value: 31.11 },
  { time: `2018-12-24`, value: 27.02 },
  { time: `2018-12-25`, value: 27.32 },
  { time: `2018-12-26`, value: 25.17 },
  { time: `2018-12-27`, value: 28.89 },
  { time: `2018-12-28`, value: 25.46 },
  { time: `2018-12-29`, value: 23.92 },
  { time: `2018-12-30`, value: 22.68 },
  { time: `2018-12-31`, value: 22.67 },
  { time: `2019-01-01`, value: 22.67 },
  { time: `2019-01-02`, value: 22.67 },
  { time: `2019-01-03`, value: 22.67 },
  { time: `2019-01-04`, value: 22.67 },
  { time: `2019-01-05`, value: 22.67 },
  { time: `2019-01-07`, value: 22.67 },
];
export const PortfolioCardChart = () => {
  const [chartData] = useState(
    POINTS.map((point) => ({ ...point, value: Math.random() * 30 })),
  );

  const theme = useTheme()

  return (
    <AreaChart
      fitContent
      options={{
        layout: {
          backgroundColor: `transparent`,
        },
        handleScale: false,
        handleScroll: false,
        watermark: {
          visible: false,
        },
        crosshair: {
          horzLine: {
            visible: false,
          },
          mode: undefined,

          vertLine: {
            visible: false,
          },
        },
        rightPriceScale: {
          visible: false,
        },
        timeScale: {
          visible: false,
        },
        grid: {
          vertLines: {
            visible: false,
          },
          horzLines: {
            visible: false,
          },
        },
      }}
      seriesOptions={{
        lineColor: alpha(theme.palette.success.light, 0.4),
        bottomColor: alpha(`rgba(86,218,179,0.2)`, 0.03),
        crosshairMarkerVisible: false,
      }}
      data={chartData}
    />
  );
};
