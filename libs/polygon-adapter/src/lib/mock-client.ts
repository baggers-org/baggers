import { IRestClient } from '@polygon.io/client-js';
import * as mockedRestClient from '@polygon.io/client-js/lib/rest';

const { crypto, forex, stocks, options, reference } =
  mockedRestClient.restClient('test');

export const PolygonMockClient: IRestClient = {
  stocks,
  crypto,
  forex,
  options,
  reference: {
    ...reference,
    tickerDetails: async (ticker: string) => ({
      results: {
        ticker,
        active: true,
        address: {
          address1: ticker,
          city: ticker,
          state: ticker,
        },
        branding: {
          icon_url: ticker,
          logo_url: ticker,
        },
        cik: 12312312,
        composite_figi: ticker,
        currency_name: ticker,
        description: ticker,
        homepage_url: ticker,
        list_date: ticker,
        locale: ticker,
        market: ticker,
        market_cap: 123123123,
        name: ticker,
        phone_number: ticker,
        primary_exchange: ticker,
        share_class_figi: ticker,
        share_class_shares_outstanding: 123123,
        sic_code: 213123,
        sic_description: ticker,
        total_employees: 123123,
        type: ticker,
        weighted_shares_outstanding: 123123,
      },
    }),
  },
};
