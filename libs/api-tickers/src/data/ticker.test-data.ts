import mongoose from 'mongoose';
import { Ticker } from '../lib/entities';

export const A: Ticker = {
  _id: new mongoose.Types.ObjectId('62988fced38076b635386a91'),
  exchange: 'XNYS',
  symbol: 'A',
  createdAt: new Date('01/01/01'),
  updatedAt: new Date('01/01/01'),
  cik: '0001090872',
  currency: 'USD',
  exchangeName: 'New York Stock Exchange Inc',
  figi: 'BBG000C2V3D6',
  iexId: 'IEX_46574843354B2D52',
  name: 'Agilent Technologies Inc.',
  region: 'US',
  symbolType: 'cs',
  quote: {
    avgTotalVolume: 2116779,
    calculationPrice: 'close',
    change: -4.47,
    changePercent: -0.03504,
    companyName: 'Agilent Technologies Inc.',
    close: 123.09,
    closeSource: 'official',
    closeTime: 1654113785978,
    currency: 'USD',
    delayedPrice: 123.1,
    delayedPriceTime: 1654113587763,
    extendedPrice: 121.11,
    extendedChange: -1.98,
    extendedChangePercent: -0.01609,
    extendedPriceTime: 1654157819307,
    high: 128.98,
    highSource: '15 minute delayed price',
    highTime: 1654113599921,
    iexAskPrice: 0,
    iexAskSize: 0,
    iexBidPrice: 0,
    iexBidSize: 0,
    iexClose: 123.07,
    iexCloseTime: 1654113598069,
    iexLastUpdated: 1654113598069,
    iexOpen: 127.78,
    iexOpenTime: 1654090201575,
    iexRealtimePrice: 123.07,
    iexRealtimeSize: 4,
    iexMarketPercent: 8656,
    iexVolume: 60592,
    isUSMarketOpen: false,
    lastTradeTime: 1654113599921,
    latestPrice: 123.09,
    latestSource: 'Close',
    latestTime: 'June 1, 2022',
    latestUpdate: 1654113785978,
    latestVolume: 1304417,
    low: 122.405,
    lowTime: 1654102274750,
    lowSource: 'IEX real time price',
    marketCap: 36767974613,
    oddLotDelayedPrice: 123.1,
    oddLotDelayedPriceTime: 1654113586784,
    open: 128.91,
    openSource: 'official',
    openTime: 1654003800794,
    peRatio: 31.24,
    previousClose: 127.56,
    previousVolume: 3403072,
    primaryExchange: 'NEW YORK STOCK EXCHANGE INC.',
    symbol: '62988fced38076b635386a91',
    week52High: 178.83,
    week52Low: 112.64,
    volume: 0,
    ytdChange: -0.2618135242329768,
  },
};

export const TSLA: Ticker = {
  _id: new mongoose.Types.ObjectId('62989022d38076b6353967c3'),
  exchange: 'XNAS',
  createdAt: new Date('01/01/01'),
  updatedAt: new Date('01/01/01'),
  symbol: 'TSLA',
  cik: '0001318605',
  currency: 'USD',
  exchangeName: 'Nasdaq All Markets',
  figi: 'BBG000N9MNX3',
  iexId: 'IEX_5132594E314E2D52',
  name: 'Tesla Inc',
  region: 'US',
  symbolType: 'cs',
  quote: {
    avgTotalVolume: 31432975,
    calculationPrice: 'close',
    change: -17.89,
    changePercent: -0.02359,
    companyName: 'Tesla Inc',
    close: 740.37,
    closeSource: 'official',
    closeTime: 1654113601016,
    currency: 'USD',
    delayedPrice: 740.72,
    delayedPriceTime: 1654113585343,
    extendedPrice: null,
    extendedChange: null,
    extendedChangePercent: null,
    extendedPriceTime: null,
    high: null,
    highSource: null,
    highTime: null,
    iexAskPrice: 0,
    iexAskSize: 0,
    iexBidPrice: 0,
    iexBidSize: 0,
    iexClose: 740.23,
    iexCloseTime: 1654113599715,
    iexLastUpdated: 1654114848317,
    iexOpen: 755.57,
    iexOpenTime: 1654090200486,
    iexRealtimePrice: 738.1,
    iexRealtimeSize: 1,
    iexMarketPercent: 9.869173652694611,
    iexVolume: 618057,
    isUSMarketOpen: false,
    lastTradeTime: 1654113599716,
    latestPrice: 740.37,
    latestSource: 'Close',
    latestTime: 'June 1, 2022',
    latestUpdate: 1654113601016,
    latestVolume: 24657295,
    low: null,
    lowTime: null,
    lowSource: null,
    marketCap: 767030668172,
    oddLotDelayedPrice: 740.43,
    oddLotDelayedPriceTime: 1654113587235,
    open: 773.61,
    openSource: 'official',
    openTime: 1654003802079,
    peRatio: 100.05,
    previousClose: 758.26,
    previousVolume: 33971457,
    primaryExchange: 'NASDAQ',
    symbol: '62989022d38076b6353967c3',
    week52High: 1243.49,
    week52Low: 571.22,
    volume: 0,
    ytdChange: -0.3229995270538807,
  },
};

export const Tickers = [A, TSLA];
