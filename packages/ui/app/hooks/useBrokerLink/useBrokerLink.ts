import { useFetcher } from '@remix-run/react';
import { useCallback, useEffect } from 'react';
import { usePlaidLink } from 'react-plaid-link';
import {
  PlaidCreateLinkTokenResponse,
  PortfolioCreateLinkTokenMutation,
} from '~/generated/graphql';

export const useBrokerLink = (portfolioId: string) => {
  const createLinkToken = useFetcher<PortfolioCreateLinkTokenMutation>();
  const { data } = createLinkToken;
  const linkToken = data?.portfolioCreateLinkToken?.link_token;

  const { open, ready } = usePlaidLink({
    token: linkToken || null,
    onSuccess: (public_token) => {
      createLinkToken.submit(
        { public_token },
        { action: `/portfolios/${portfolioId}/link_broker`, method: `post` },
      );
    },
  });

  useEffect(() => {
    if (linkToken && ready) {
      open();
    }
  }, [createLinkToken.data, ready]);

  const sync = useCallback(() => {
    createLinkToken.submit(
      {},
      {
        method: `post`,
        action: `/portfolios/${portfolioId}/sync_broker`,
      },
    );
  }, []);

  return {
    openLink: useCallback(() => {
      createLinkToken.submit(
        {},
        {
          method: `post`,
          action: `/portfolios/${portfolioId}/create_link_token`,
        },
      );
    }, []),

    sync,
  };
};
