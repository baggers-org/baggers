export type Point = { x: number; y: number };
export type GetRandomSeriesProps = {
  maxY: number;
  maxX: number;
  numberOfPoints?: number;
  volatility?: number;
};

export const getRandomSeries = ({
  maxX,
  maxY,
  numberOfPoints = 40,
  volatility = 0.3,
}: GetRandomSeriesProps) => {
  const xInterval = Math.floor(maxX / numberOfPoints);
  const firstPrice = Math.random() * volatility * 100;
  const rawSeries: Point[] = [
    {
      x: 0,
      y: firstPrice,
    },
  ];
  const scale = (
    inputY: number,
    yRange: Array<number>,
    xRange: Array<number>,
  ): number => {
    const [xMin, xMax] = xRange;
    const [yMin, yMax] = yRange;

    const percent = (inputY - yMin) / (yMax - yMin);
    const outputX = percent * (xMax - xMin) + xMin;

    return outputX;
  };

  for (let i = 1; i < numberOfPoints; i += 1) {
    const r = Math.random();
    const x = i * xInterval;
    const previousPoint = rawSeries[i - 1];
    const previousPrice = previousPoint.y;

    // Get a random change percentage based on volaility
    // But not more than the volatility amount
    let changePercent = 2 * volatility * r;

    if (changePercent > volatility) {
      changePercent -= 2 * volatility;
    }

    const changeAmount = previousPrice * changePercent;
    const newPrice = previousPrice + changeAmount;

    rawSeries.push({ x, y: newPrice });
  }

  const targetRange = { min: 0, max: maxY };
  const measuredRange = { min: Number.MAX_VALUE, max: -1 };
  rawSeries.forEach((point) => {
    if (point.y > measuredRange.max) {
      measuredRange.max = point.y;
    }
    if (point.y < measuredRange.min) {
      measuredRange.min = point.y;
    }
  });

  const normalisedSeries = rawSeries.map((point) => {
    const { y } = point;
    return {
      x: point.x,
      y: scale(
        y,
        [measuredRange.min, measuredRange.max],
        [targetRange.min, targetRange.max],
      ),
    };
  });

  return normalisedSeries;
};
