import PageLoadingOverlay from '@/components/PageLoadingOverlay/PageLoadingOverlay';
import PortfolioCardList from '@/components/PortfolioCardList';
import { useMyPortfoliosSummaryQuery } from '@/graphql/Queries.document.gql';
import useCurrentUser from '@/hooks/useCurrentUser/useCurrentUser';
import useNotifications from '@/hooks/useNotifications/useNotifications';
import { Container, Grid, Typography } from '@material-ui/core';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

import { useCookies } from 'react-cookie';

import MyPortfolioCard from './components/MyPortfolioCard/MyPortfolioCard';
import NoPortfoliosMessage from './components/NoPortfoliosMessage/NoPortfoliosMessage';

type Props = {};

const PortfoliosPage: React.FC<Props> = () => {
  const { data } = useMyPortfoliosSummaryQuery();

  useCurrentUser({
    redirectTo: `/login`,
  });

  const portfolios = data?.myPortfolios;
  const { push } = useRouter();

  const loadingPortfolios = !data;

  const handleOpenPortfolio = (id: string) => {
    push(`/portfolios/${id}`);
  };

  const [cookies, setCookie] = useCookies();
  const { sendNotification } = useNotifications();

  useEffect(() => {
    if (cookies.onboarding) {
      sendNotification({
        message: `Everything you see is heavily under development.`,
        type: `info`,
      });
      sendNotification({
        message: `👋 Hi! Thanks for joining the baggers beta!`,
        type: `info`,
      });
      setCookie(`onboarding`, undefined);
    }
  }, []);

  return (
    <Container maxWidth="xl">
      {loadingPortfolios && <PageLoadingOverlay />}
      <Grid container spacing={3} direction="column">
        <Grid item>
          {portfolios?.length ? (
            <Typography variant="h4">MY PORTFOLIOS</Typography>
          ) : null}
        </Grid>
        <Grid item>
          <PortfolioCardList
            portfolios={portfolios}
            onOpenPortfolio={handleOpenPortfolio}
            PortfolioCard={MyPortfolioCard}
          />
        </Grid>

        <Grid item>
          {!loadingPortfolios && portfolios?.length === 0 ? (
            <NoPortfoliosMessage
              onCreatePortfolio={() => push(`/portfolios/create/1`)}
            />
          ) : null}
        </Grid>
      </Grid>
    </Container>
  );
};
export default PortfoliosPage;
