import React from 'react';
import {
  Favorite,
  ModeComment,
  Public,
  PublicOff,
  RemoveRedEye,
} from '@mui/icons-material';
import {
  Avatar,
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Stack,
  Typography,
} from '@mui/material';
import { formatCurrency } from '~/util';
import { useTranslation } from 'react-i18next';
import { useNavigate } from '@remix-run/react';
import { MyPortfoliosSummaryQuery } from '~/generated/graphql';
import { useCurrentUser } from '~/hooks/useCurrentUser';
import { PriceTag } from '../PriceTag';
import { PortfolioCardChart } from './components';
import { PortfolioTags } from '../PortfolioTags';
import { NoDataChart } from './components/NoDataChart';

export type PortfolioCardProps = {
  portfolio: MyPortfoliosSummaryQuery['myPortfolios'][number];
};
export const PortfolioCard: React.FC<PortfolioCardProps> = ({ portfolio }) => {
  const { t } = useTranslation(`portfolios_overview`);

  const navigate = useNavigate();

  const user = useCurrentUser();

  return (
    <Card variant="outlined" sx={{ height: `100%` }}>
      <CardActionArea
        onClick={() => navigate(`/portfolios/${portfolio._id}/holdings`)}
      >
        <CardMedia>
          <Stack textAlign="center" p={3}>
            <Stack
              direction="row"
              justifyContent="center"
              position="relative"
              alignItems="flex-start"
              height={100}
            >
              <Box width="32px" position="absolute" top={0} left={0}>
                {portfolio?.private ? <PublicOff /> : <Public />}
              </Box>
              <Typography variant="h4" ml="auto" mr="auto" textAlign="center">
                {portfolio.name}
              </Typography>
              <Box position="absolute" width="32px" height="32px" right={0}>
                <Avatar src={user?.photos?.[0]} />
              </Box>
            </Stack>
          </Stack>
          <Box height={100} ml={-1} top={0} width="100%" zIndex={0}>
            {portfolio?.holdings?.length ? (
              <PortfolioCardChart />
            ) : (
              <NoDataChart />
            )}
          </Box>
        </CardMedia>
        <CardContent sx={{ pb: 0, px: 5 }}>
          <Stack
            alignItems="center"
            justifyContent="space-between"
            width="100%"
            mb={2}
          >
            {portfolio?.holdings?.length ? (
              <Stack
                display="flex"
                width="100%"
                direction="row"
                justifyContent="space-between"
                justifyItems="center"
                textAlign="center"
                mb={1}
              >
                <PriceTag
                  value={portfolio?.performance?.dailyReturnPercent}
                  label="Today"
                  isPercent
                />
                <PriceTag
                  value={portfolio?.performance?.ytdReturnPercent}
                  label="YTD"
                  isPercent
                />
                <PriceTag
                  value={portfolio?.performance?.ytdReturnPercent}
                  label="All time"
                  isPercent
                />
              </Stack>
            ) : (
              <Typography variant="caption">
                {t(`no_holdings`, `This portfolio has no holdings.`)}
              </Typography>
            )}
            <Typography variant="h4" color="mediumEmphasis" my={1}>
              {formatCurrency(portfolio?.totalValue || 0)}
            </Typography>
          </Stack>
          {portfolio.holdings.length ? (
            <>
              <Divider sx={{ my: 2 }} />
              <PortfolioTags portfolio={portfolio} />
              <Divider sx={{ my: 2 }} />
              <Typography variant="subtitle2">
                {t(`top_holdings`, `Top Holdings`)}
              </Typography>
              <List>
                {portfolio?.holdings?.slice(0, 2).map((holding) => (
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar />
                    </ListItemAvatar>
                    <ListItemText>
                      {holding.symbol.symbol}
                      {` `}
                      {(holding.exposure * 100).toFixed(2)}%
                    </ListItemText>
                  </ListItem>
                ))}
              </List>
            </>
          ) : null}
        </CardContent>

        {!portfolio?.private ? (
          <Stack direction="row" justifyContent="space-between" p={4}>
            <Stack>
              <RemoveRedEye />
              <Typography>1,232,023</Typography>
            </Stack>
            <Stack>
              <Favorite />
              <Typography>2391</Typography>
            </Stack>
            <Stack>
              <ModeComment />
              <Typography>109</Typography>
            </Stack>
          </Stack>
        ) : null}
      </CardActionArea>
    </Card>
  );
};
