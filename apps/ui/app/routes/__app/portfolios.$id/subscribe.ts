import { Portfolio } from '@baggers/graphql-types';
import { LoaderFunction } from '@remix-run/node';
import { EventStream } from 'remix-sse';
import { unauthSubscriptionsClient } from '~/server/sdk.server';

export const loader: LoaderFunction = async ({ request, params }) => {
  const { id } = params;

  const client = await unauthSubscriptionsClient(request);

  return new EventStream(request, (send) => {
    send('init', '');
    client.subscribe(
      {
        query: `
          subscription portfoliosSubscribeToMarketData($id: ObjectId!) {
            portfoliosSubscribeToMarketData(_id: $id) {
              _id
              totalValue
              holdings {
                _id
                marketValue
                profitLossUsd
                profitLossPercent
                dailyProfitLossUsd
                security {
                  latestPrice
                }
              }
            }
          }
        `,

        variables: {
          id,
        },
      },
      {
        error: (err) => console.error(err),
        complete: console.log,
        next: ({ data, errors }) => {
          if (errors) {
            console.error(errors);
            throw Error(
              'There was an error subscribing to the portfolio'
            );
          }

          if (data) {
            const { totalValue, holdings } =
              data.portfoliosSubscribeToMarketData as Portfolio;
            send('totalValue', JSON.stringify(totalValue));
            send('holdings', JSON.stringify(holdings));
          }
        },
      }
    );

    return async () => {
      await client.dispose();
    };
  });
};
