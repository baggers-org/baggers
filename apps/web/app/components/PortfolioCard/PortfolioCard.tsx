import React from 'react';
import {
  Favorite,
  ModeComment,
  Public,
  PublicOff,
  RemoveRedEye,
} from '@mui/icons-material';
import {
  alpha,
  Avatar,
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Checkbox,
  Divider,
  Grow,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Stack,
  Typography,
  useTheme,
  Zoom,
} from '@mui/material';
import { formatCurrency } from '~/util';
import { useTranslation } from 'react-i18next';
import { useNavigate } from '@remix-run/react';
import { useCurrentUser } from '~/hooks/useCurrentUser';
import { PriceTag } from '../PriceTag';
import { PortfolioCardChart } from './components';
import { PortfolioTags } from '../PortfolioTags';
import { NoDataChart } from './components/NoDataChart';
import { PortfoliosCreatedQuery } from '@baggers/graphql-types';

export type PortfolioCardProps = {
  portfolio: PortfoliosCreatedQuery['portfoliosCreated'][number];
  isSelectable?: boolean;
  onSelect?: (_id: string) => void;
  selected?: boolean;
};
export const PortfolioCard: React.FC<PortfolioCardProps> = ({
  portfolio,
  onSelect,
  isSelectable,
  selected,
}) => {
  const { t } = useTranslation(`portfolios_overview`);

  const navigate = useNavigate();
  const user = useCurrentUser();

  const theme = useTheme();

  return (
    <Grow in timeout={200}>
      <Card
        data-cy="portfolio-card"
        sx={{
          height: `100%`,
          border: selected ? `2px solid ${theme.palette.primary.main}` : null,
          bgcolor: selected ? alpha(theme.palette.primary.light, 0.16) : null,
        }}
      >
        <CardActionArea
          onClick={() => {
            if (!isSelectable) {
              navigate(`/portfolios/${portfolio._id}/holdings`);
            } else {
              onSelect?.(portfolio._id);
            }
          }}
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
                <Typography
                  variant="h4"
                  ml="auto"
                  mr="auto"
                  textAlign="center"
                  maxWidth="200px"
                >
                  {portfolio.name}
                </Typography>
                <Box position="absolute" width="32px" height="32px" right={0}>
                  {isSelectable ? (
                    <Zoom in>
                      <Checkbox
                        onClick={() => onSelect?.(portfolio?._id)}
                        checked={selected}
                        name="portfolio"
                        value={selected ? portfolio?._id : null}
                      />
                    </Zoom>
                  ) : (
                    <Grow in>
                      <Avatar src={user?.photos?.[0]} />
                    </Grow>
                  )}
                </Box>
              </Stack>
            </Stack>
            <Box height={100} ml={-1} top={0} width="100%" zIndex={0}>
              {portfolio?.top5Holdings?.length ? (
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
              {portfolio?.top5Holdings?.length ? (
                <Stack
                  display="flex"
                  width="100%"
                  direction="row"
                  justifyContent="space-between"
                  justifyItems="center"
                  textAlign="center"
                  mb={1}
                >
                  <PriceTag value={12.5} label="Today" isPercent />
                  <PriceTag value={50.6} label="YTD" isPercent />
                  <PriceTag value={485} label="All time" isPercent />
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
            {portfolio.top5Holdings.length ? (
              <>
                <Divider sx={{ my: 2 }} />
                <PortfolioTags portfolio={portfolio} />
                <Divider sx={{ my: 2 }} />
                <Typography variant="subtitle2">
                  {t(`top_holdings`, `Top Holdings`)}
                </Typography>
                <List>
                  {portfolio?.top5Holdings?.slice(0, 2).map((holding) => (
                    <ListItem>
                      <ListItemAvatar>
                        <Avatar />
                      </ListItemAvatar>
                      <ListItemText>
                        {holding?.security?.symbol ||
                          holding?.importedSecurity?.ticker_symbol}
                        {` `}
                        {holding.exposure.toFixed(2)}%
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
    </Grow>
  );
};
