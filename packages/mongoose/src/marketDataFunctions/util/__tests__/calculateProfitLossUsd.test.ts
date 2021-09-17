import calculateProfitLossUsd from '../calculateProfitLossUsd';

test(`it should return the correct pl usd given market value and cost basis`, () => {
  expect(calculateProfitLossUsd(300, 900)).toBe(600);
});
