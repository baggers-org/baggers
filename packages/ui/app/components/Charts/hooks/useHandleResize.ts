import { IChartApi } from "lightweight-charts";
import { useEffect } from "react";
import { useDebouncedCallback } from "use-debounce";

import { ChartProps } from "../types";

export const useHandleResize = (
  container: HTMLDivElement | null,
  chart: IChartApi | null,
  props: ChartProps
) => {
  const handleResize = useDebouncedCallback(() => {
    if (chart && container) {
      const newWidth = container.parentElement?.clientWidth;
      const newHeight = container.parentElement?.clientHeight || 500;

      if (newWidth && newHeight) {
        chart.resize(newWidth, newHeight);

        if (props.fitContent) {
          chart.timeScale().fitContent();
        }
      }
    }
  }, 50);
  useEffect(() => {
    window.addEventListener(`resize`, handleResize);
  }, []);
  useEffect(() => {
    handleResize();
  }, [chart, container]);
};
