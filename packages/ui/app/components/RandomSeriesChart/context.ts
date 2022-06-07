import React from 'react';

export const RandomSeriesContext = React.createContext<{
  ctx: CanvasRenderingContext2D | undefined;
  size?: { width: number; height: number };
}>({
  ctx: undefined,
  size: { width: 0, height: 0 },
});
