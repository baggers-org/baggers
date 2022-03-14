import {
  BarData,
  HistogramData,
  LineData,
  WhitespaceData,
  ChartOptions,
  DeepPartial,
  LineSeriesOptions,
  HistogramSeriesOptions,
  CandlestickSeriesOptions,
  AreaSeriesOptions,
} from 'lightweight-charts';

export interface BaseChartProps {
  options: DeepPartial<ChartOptions>;
  fitContent?: boolean;
}
export interface LineChartProps extends BaseChartProps {
  data: (LineData | WhitespaceData)[];
  seriesOptions?: DeepPartial<LineSeriesOptions>;
}
export interface HistogramChartProps extends BaseChartProps {
  data: (HistogramData | WhitespaceData)[];
  seriesOptions?: DeepPartial<HistogramSeriesOptions>;
}
export interface CandleStickChartProps extends BaseChartProps {
  data: (BarData | WhitespaceData)[];
  seriesOptions?: DeepPartial<CandlestickSeriesOptions>;
}
export interface AreaChartProps extends BaseChartProps {
  data: (LineData | WhitespaceData)[];
  seriesOptions?: DeepPartial<AreaSeriesOptions>;
}

export type ChartProps =
  | LineChartProps
  | HistogramChartProps
  | CandleStickChartProps
  | AreaChartProps;
