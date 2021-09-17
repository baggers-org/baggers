import calculateMarketValue from '../calculateMarketValue';

test(`it should calcualte the correct market value given the number of shares and the current price`, () => {
  expect(calculateMarketValue(100, 5)).toBe(500);
});
