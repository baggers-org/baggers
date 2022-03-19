import React from 'react';
import { Favorite, ModeComment, RemoveRedEye } from '@mui/icons-material';
import {
  Avatar,
  Badge,
  Box,
  Card,
  CardActionArea,
  CardContent,
  Chip,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Skeleton,
  Typography,
} from '@mui/material';
import { formatCurrency } from '~/util';
import { useTranslation } from 'react-i18next';
import { useMatches, useNavigate } from '@remix-run/react';
import { Portfolio } from '~/generated/graphql';
import { useCurrentUser } from '~/hooks/useCurrentUser';
import { PriceTag } from '../PriceTag';
import { PortfolioCardChart } from './components';

export type PortfolioCardProps = {
  portfolio: Portfolio;
};
export const PortfolioCard: React.FC<PortfolioCardProps> = ({ portfolio }) => {
  const { t } = useTranslation(`portfolios_overview`);

  const navigate = useNavigate();

  if (!portfolio) {
    return <Skeleton />;
  }

  const user = useCurrentUser();
  console.log(portfolio.analysis.top5Holdings);

  return (
    <Card variant="outlined">
      <CardActionArea
        onClick={() => navigate(`/portfolios/${portfolio._id}/holdings`)}
      >
        <CardContent sx={{ pb: 0, px: 5 }}>
          <Grid container>
            <Grid item container xs={12} alignItems="center" gap={2}>
              <Typography variant="h5" color="mediumEmphasis">
                {formatCurrency(portfolio?.totalValue || 0)}
              </Typography>
              <PriceTag color="profit">
                {portfolio?.performance?.dailyReturnPercent}%
              </PriceTag>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h4">{portfolio.name}</Typography>
            </Grid>
            <Grid item container alignItems="center" xs={12} mt={2}>
              <Avatar src={user?.photos?.[0]} />
              <Typography variant="body2" color="secondary" ml={2}>
                by You
              </Typography>
            </Grid>
            {!portfolio?.private ? (
              <Grid
                container
                item
                xs={12}
                mt={4}
                justifyItems="center"
                justifyContent="space-between"
                alignContent="center"
                color="mediumEmphasis"
              >
                <RemoveRedEye />
                <Typography>1,232,023</Typography>
                <Favorite />
                <Typography>2391</Typography>
                <ModeComment />
                <Typography>109</Typography>
              </Grid>
            ) : null}

            <Grid container mt={2} gap={2}>
              <Chip label="Dividend" />
            </Grid>
            <Grid xs={12}>
              <Typography>Top 5 Holdings</Typography>
              <List>
                {portfolio?.analysis?.top5Holdings.map((holding) => (
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar />
                    </ListItemAvatar>
                    <ListItemText>
                      {holding.symbol.name}
                      {` `}
                      {(holding.exposure * 100).toFixed(2)}%
                    </ListItemText>
                  </ListItem>
                ))}
              </List>
            </Grid>
            <Grid xs={12}>
              <Box height={150} mx={-8}>
                <PortfolioCardChart />
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};
