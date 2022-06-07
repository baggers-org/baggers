import { useContext, useEffect } from 'react';
import { RandomSeriesContext } from '../context';
import { getRandomSeries } from '../util';
import { RandomSeriesChild } from './types';

export interface RandomLineProps extends RandomSeriesChild {
  // Default 5
  lineWidth?: number;
  strokeStyle?: CanvasRenderingContext2D['strokeStyle'];
}
export const RandomLine: React.FC<RandomLineProps> = ({
  width,
  height,
  numberOfPoints,
  volatility,
  lineWidth = 3,
  strokeStyle = `blue`,
}) => {
  const { ctx, size } = useContext(RandomSeriesContext);

  useEffect(() => {
    if (ctx && size) {
      const beginDrawing = () => {
        ctx.lineWidth = lineWidth;
        ctx.lineCap = `round`;
        ctx.strokeStyle = strokeStyle;

        const series = getRandomSeries({
          maxX: width || size.width,
          maxY: height || size.height,
          numberOfPoints,
          volatility,
        });

        series.forEach((point, index) => {
          const nextPoint = series[index + 1];
          if (!nextPoint) return;
          ctx.beginPath();
          ctx.moveTo(point.x, point.y);
          ctx.lineTo(nextPoint.x, nextPoint.y);
          ctx.moveTo(nextPoint.x, nextPoint.y);
          ctx.stroke();
        });

        ctx.closePath();
      };

      beginDrawing();
    }
  }, [ctx, lineWidth, numberOfPoints, volatility, width, height, strokeStyle]);
  return null;
};
