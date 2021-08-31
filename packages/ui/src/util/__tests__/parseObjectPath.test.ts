import parseObjectPath from '../parseObjectPath';

it(`should correctly parse an object path into an array`, () => {
  expect(parseObjectPath(`symbol.quote.latestPrice`)).toEqual([
    `symbol`,
    `quote`,
    `latestPrice`,
  ]);
});
