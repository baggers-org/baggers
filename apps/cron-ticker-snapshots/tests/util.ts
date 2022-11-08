import * as stocks from '@polygon.io/client-js/lib/rest/stocks';

const stocksClientMock = jest.spyOn(stocks, 'stocksClient');

export const mockPolygonStocksClientMethod = (method: any) => {
  console.log('Mocking with ', method);

  stocksClientMock.mockImplementationOnce(() => ({
    aggregates: jest.fn(),
    aggregatesGroupedDaily: jest.fn(),
    dailyOpenClose: jest.fn(),
    lastQuote: jest.fn(),
    lastTrade: jest.fn(),
    previousClose: jest.fn(),
    quotes: jest.fn(),
    snapshotGainersLosers: jest.fn(),
    snapshotTicker: jest.fn(),
    trades: jest.fn(),
    ...method,
  }));
};
