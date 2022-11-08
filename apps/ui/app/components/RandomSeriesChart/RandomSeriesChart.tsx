import { Box } from '@mui/system';
import React, {
  Children,
  PropsWithChildren,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { RandomSeriesContext } from './context';

export interface SeriesChartProps {
  width?: number | string;
  height?: number | string;
}
export const RandomSeriesChart: React.FC<
  PropsWithChildren<SeriesChartProps>
> = ({ height = `100%`, width = `100%`, children }) => {
  const [size, setSize] = useState<
    | {
        width: number;
        height: number;
      }
    | undefined
  >();

  const containerRef = useRef<HTMLDivElement>();

  useEffect(() => {
    if (containerRef.current) {
      setSize({
        width: containerRef.current.clientWidth,
        height: containerRef.current.clientHeight,
      });
    }
  }, [containerRef]);

  const ContextValue = useMemo(
    () => ({
      size,
    }),
    [size]
  );
  return (
    <Box sx={{ height, width }} ref={containerRef}>
      <RandomSeriesContext.Provider value={ContextValue}>
        {Children.map(children, (child, index) => {
          if (React.isValidElement(child)) {
            return React.cloneElement(child, {
              ...child.props,
              id: `random-chart_${index}`,
            });
          }
          return null;
        })}
      </RandomSeriesContext.Provider>
    </Box>
  );
};
