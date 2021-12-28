import { useNewPortfolio } from '@/hooks';
import { Box, Button, Stack, Typography } from '@mui/material';
import { useTranslation } from 'next-i18next';
import PortfolioGraphic from '../../../../../public/svg/portfolio.svg';

export const NoPortfoliosMessage: React.FC = () => {
  const { t } = useTranslation(`portfolios_overview`);

  const { createNewPortfolio } = useNewPortfolio();

  return (
    <Stack textAlign="center" alignItems="center" spacing={2}>
      <Box width={{ xs: `60%`, md: `45%` }} height={{ xs: `60%`, md: `45%` }}>
        <PortfolioGraphic />
      </Box>
      <Typography variant="h4" color="highEmphasis">
        {t(`you_do_not_have_any_portfolios`, `You do not have any portfolios`)}
      </Typography>
      <Typography variant="subtitle1" color="highEmphasis">
        {t(
          `click_create`,
          `Click "Create Portfolios" to create your first one now!`,
        )}
      </Typography>
      <Box maxWidth="200px">
        <Button variant="contained" onClick={() => createNewPortfolio()}>
          {t(`create_portfollio`, `Create portfolio`)}
        </Button>
      </Box>
    </Stack>
  );
};
