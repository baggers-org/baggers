import { schemaComposer } from 'graphql-compose';
import { fetchFromIEX } from '../../../util';

const TradingDateResponse = `type TradingDateResponse { date: String, settlementDate: String }`;
export const addHolidaysAndTradingDatesGraphQL = () => {
  schemaComposer.Query.addFields({
    getTradingDate: {
      name: `getTradingDate`,
      type: TradingDateResponse,
      args: {
        from: `String`,
        direction: `enum DIRECTION { next last }`,
      },

      resolve: async (_, { direction }: any) => {
        const response = await fetchFromIEX(
          `/ref-data/us/dates/trade/${direction}`,
        );

        const data = await response.json();

        return data[0];
      },
    },
  });
};
