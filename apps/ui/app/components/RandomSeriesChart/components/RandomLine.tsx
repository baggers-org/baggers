import { Svg, SVG } from '@svgdotjs/svg.js';
import { useContext, useEffect, useState } from 'react';
import Vivus from 'vivus';
import { RandomSeriesContext } from '../context';
import { getRandomSeries } from '../util';
import { RandomSeriesChild } from './types';

export interface RandomLineProps extends RandomSeriesChild {
  // Default 5
  lineWidth?: number;
  strokeStyle?: CanvasRenderingContext2D['strokeStyle'];
}
export const RandomLine: React.FC<RandomLineProps> = ({
  id,
  width,
  height,
  numberOfPoints,
  volatility,
  lineWidth = 3,
  strokeStyle = `blue`,
  animate,
}) => {
  const [draw, setDraw] = useState<Svg>();
  const { size } = useContext(RandomSeriesContext);

  const w = width || size?.width;
  const h = height || size?.height;

  useEffect(() => {
    if (!w || !h || !id) return;
    if (!draw) {
      setDraw(SVG(`#${id}_svg`).toRoot().size(w, h));
    }
  }, [draw, w, h, id]);

  useEffect(() => {
    if (draw && w && h) {
      const series = getRandomSeries({
        maxX: w + 500, // to ensure we go off the edge of the canvas
        maxY: h,
        numberOfPoints,
        volatility,
      });
      draw.clear();
      const line = draw.polyline(series?.map(({ x, y }) => [x, y]) as any);

      line.move(-10, 0);
      line.fill(`none`).stroke({
        color: strokeStyle as string,
        width: lineWidth,
        linecap: `round`,
        linejoin: `round`,
      });

      new Vivus(`${id}_svg`, {
        ...animate,
      }) as any;
    }
  }, [draw, lineWidth, width, height, id, strokeStyle, w, h]);

  return <svg id={`${id}_svg`} />;
};
