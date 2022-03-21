import { useTheme } from '@mui/material';
import { alpha } from '@mui/system';
import { useState } from 'react';

// eslint-disable-next-line
// @ts-expect-error
import loadable from '@loadable/component';

const AreaChart = loadable.lib(async () => {
  if (typeof window !== `undefined`) {
    return import(`~/components/Charts/AreaChart`);
  }

  return <div />;
});

const POINTS = [
  { time: `2018-12-22`, value: 30 },
  { time: `2018-12-23`, value: 30 },
  { time: `2018-12-24`, value: 30 },
  { time: `2018-12-25`, value: 30 },
  { time: `2018-12-26`, value: 30 },
  { time: `2018-12-27`, value: 30 },
  { time: `2018-12-28`, value: 30 },
  { time: `2018-12-29`, value: 30 },
  { time: `2018-12-30`, value: 30 },
  { time: `2018-12-31`, value: 30 },
  { time: `2019-01-01`, value: 30 },
  { time: `2019-01-02`, value: 30 },
  { time: `2019-01-03`, value: 30 },
  { time: `2019-01-04`, value: 30 },
  { time: `2019-01-05`, value: 30 },
  { time: `2019-01-07`, value: 30 },
];
export const NoDataChart = () => {
  const [chartData] = useState(POINTS);

  const theme = useTheme();

  return (
    <AreaChart>
      {({ default: Area }: { default: any }) => (
        <Area
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
            lineColor: alpha(theme.palette.grey[200], 0.8),
            topColor: alpha(theme.palette.grey[200], 0.4),
            bottomColor: alpha(theme.palette.grey[200], 0.002),
            crosshairMarkerVisible: false,
          }}
          data={chartData}
        />
      )}
    </AreaChart>
  );
};
