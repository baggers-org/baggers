import calculateExposure from '../calculateExposure';

test(`it should return the correct exposure given cash levels and market value`, () => {
  expect(calculateExposure(1000, 10000)).toBe(10);
});
