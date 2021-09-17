import calculateProfitLossPercent from '../calculateProfitLossPercent';

test(`it should return the correct pl percent given cost basis and market value`, () => {
  expect(calculateProfitLossPercent(268, 279.58)).toBe(4.32);
  expect(calculateProfitLossPercent(2500, 1481.88)).toBe(-40.72);
});
