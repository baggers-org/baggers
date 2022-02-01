import React, { useEffect, useRef, useState } from 'react';

import { SVG, Svg } from '@svgdotjs/svg.js';
import { Box, BoxProps } from '@mui/material';
import { CSSProperties } from '@mui/styled-engine';
import Vivus from 'vivus';

export type RandomSeriesChartProps = {
  id: string;
  color: CSSProperties['color'];
  numberOfPoints?: number;
  volatility?: number;

  animation?: {
    duration: number;
    delay: number;
  };

  loop?: boolean;
} & BoxProps;

type Point = { x: number; y: number };

export const RandomSeriesChart: React.FC<RandomSeriesChartProps> = ({
  id,
  numberOfPoints = 20,
  volatility = 0.2,
  color,
  animation,
  loop,
  ...boxProps
}) => {
  const [series, setSeries] = useState<Point[]>();
  const [draw, setDraw] = useState<Svg>();
  const container = useRef<HTMLDivElement>();

  const getWidth = () => container.current?.clientWidth || 500;

  const getHeight = () => container.current?.clientHeight || 300;

  const getXIncrementSize = () => Math.floor(getWidth() / numberOfPoints);

  const getYScale = () => 5;
  const generateSeries = (): Point[] => {
    let oldPrice = 10 * getYScale();
    const s: Point[] = [{ x: 0, y: getHeight() }];
    for (let i = 1; i < numberOfPoints; i += 1) {
      const r = Math.random();

      const newX = i * getXIncrementSize();

      let changePercent = 2 * volatility * r;
      if (changePercent > volatility) {
        changePercent -= 2 * volatility;
      }

      const changeAmount = oldPrice * changePercent;
      let newPrice = oldPrice + changeAmount;

      const getY = (price: number) => getHeight() - price * getYScale();
      const y = getY(newPrice);

      if (y < 0) {
        newPrice = oldPrice - changeAmount;
      }
      if (y > getHeight()) {
        newPrice = oldPrice + changeAmount;
      }

      if (newPrice) s.push({ x: newX, y: getY(newPrice) });
      oldPrice = newPrice;
    }

    return s;
  };

  useEffect(() => {
    setSeries(generateSeries());
  }, []);

  useEffect(() => {
    if (!draw) {
      setDraw(SVG(`#${id}_svg`).toRoot().size(getWidth(), getHeight()));
    }
  }, [draw]);

  useEffect(() => {
    if (draw && series) {
      draw.clear();
      const line = draw.polyline(series?.map(({ x, y }) => [x, y]) as any);

      line.move(-10, 0);
      line.fill(`none`).stroke({
        color: color as string,
        width: 4,
        linecap: `round`,
        linejoin: `round`,
      });

      new Vivus(`${id}_svg`, animation) as any;
    }
  }, [draw, series]);

  return (
    <Box id={id} ref={container} position="inherit" top={0} {...boxProps}>
      <svg id={`${id}_svg`} />
    </Box>
  );
};
