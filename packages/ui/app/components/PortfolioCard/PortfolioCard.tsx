import React from 'react';
import { Favorite, ModeComment, RemoveRedEye } from '@mui/icons-material';
import {
  Avatar,
  Box,
  Card,
  CardActionArea,
  CardContent,
  Grid,
  Grow,
  Link,
  Skeleton,
  Typography,
} from '@mui/material';
import { formatCurrency } from '~/util';
import { useTranslation } from 'react-i18next';
import { useNavigate } from '@remix-run/react';
import { Portfolio } from '~/sdk/types';
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

  return (
    <Card variant="outlined">
      <CardActionArea
        onClick={() => navigate(`/portfolios/${portfolio._id}/positions`)}
      >
        <CardContent sx={{ pb: 0, px: 5 }}>
          <Grid container>
            <Grid item container xs={12} alignItems="center" gap={2}>
              <Typography variant="h5" color="mediumEmphasis">
                {portfolio?.totalValue
                  ? formatCurrency(portfolio?.totalValue)
                  : null}
              </Typography>
              <PriceTag color="profit">+12%</PriceTag>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h4" color="primary">
                {portfolio.name}
              </Typography>
            </Grid>
            <Grid item container alignItems="center" xs={12} mt={2}>
              <Avatar />
              <Typography variant="body2" color="primary" ml={2}>
                by You
              </Typography>
            </Grid>
            <Grid item xs={12} mt={2}>
              {portfolio.description ? (
                <Typography variant="subtitle1" color="mediumEmphasis">
                  {portfolio.description}
                </Typography>
              ) : (
                <Typography
                  variant="subtitle1"
                  fontStyle="italic"
                  color="lowEmphasis"
                >
                  {t(`no_description`, `<No description>`)}
                </Typography>
              )}
            </Grid>
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

            <Grid container mt={2} gap={2}>
              <Link>Dividend</Link>
              <Link>Long-term</Link>
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
