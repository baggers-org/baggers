import { useNewPortfolio } from '@/hooks';
import theme from '@/styles/theme';
import { Button, Card, CardActionArea, CardContent } from '@mui/material';
import { useTranslation } from 'next-i18next';
import PortfolioGraphic from '../../../../../public/svg/portfolio.svg';

export const CreatePortfolioCard = () => {
  const { t } = useTranslation(`portfolios_overview`);

  const { createNewPortfolio } = useNewPortfolio();
  return (
    <Card
      sx={{
        border: `1px dashed ${theme.palette.divider}`,
        background: `transparent`,
        height: `100%`,
      }}
      variant="outlined"
    >
      <CardActionArea
        sx={{
          height: `100%`,
        }}
        onClick={() => createNewPortfolio()}
      >
        <CardContent
          sx={{
            p: 5,
            height: `100%`,
            display: `flex`,
            flexDirection: `column`,
            justifyContent: `space-between`,
          }}
        >
          <PortfolioGraphic />
          <Button variant="contained">
            {t(`create_new_portfolio`, `Create new portfolio`)}
          </Button>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};
