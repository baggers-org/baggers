import { IChartApi } from "lightweight-charts";
import { useEffect } from "react";
import { BaseChartProps } from "../types";

export const useApplyOptions = (
  chart: IChartApi | null,
  { options }: BaseChartProps
) => {
  useEffect(() => {
    if (chart) {
      chart.applyOptions(options);
    }
  }, [chart, options]);
};
