import { Box } from '@mui/system';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useUniqueId } from '~/hooks/useUniqueId';
import { RandomSeriesContext } from './context';

export interface SeriesChartProps {
  width?: number | string;
  height?: number | string;
}
export const RandomSeriesChart: React.FC<SeriesChartProps> = ({
  height = `100%`,
  width = `100%`,
  children,
}) => {
  const id = useUniqueId();
  const [size, setSize] = useState<
    | {
        width: number;
        height: number;
      }
    | undefined
  >();

  const [
    canvasContext,
    setCanvasContext,
  ] = useState<CanvasRenderingContext2D>();
  const containerRef = useRef<HTMLDivElement>();

  useEffect(() => {
    if (containerRef.current) {
      setSize({
        width: containerRef.current.clientWidth,
        height: containerRef.current.clientHeight,
      });
    }
  }, [containerRef]);

  // Setup the canvas + context for child components
  useEffect(() => {
    if (!id || !size) return;

    const canvas = document.getElementById(id) as HTMLCanvasElement;
    if (!canvas) return;
    const ctx = canvas.getContext(`2d`);
    if (!ctx) return;

    // Set actual size in memory (scaled to account for extra pixel density).
    const scale = window.devicePixelRatio; // Change to 1 on retina screens to see blurry canvas.
    canvas.width = size.width * scale;
    canvas.height = size.height * scale;

    // Normalize coordinate system to use css pixels.
    ctx.scale(scale, scale);
    setCanvasContext(ctx);
  }, [id, size]);

  const ContextValue = useMemo(
    () => ({
      ctx: canvasContext,
      size,
    }),
    [canvasContext, size],
  );

  return (
    <Box sx={{ height, width }} ref={containerRef}>
      <canvas id={id} height={size?.height} width={size?.width} />;
      <RandomSeriesContext.Provider value={ContextValue}>
        {children}
      </RandomSeriesContext.Provider>
    </Box>
  );
};
