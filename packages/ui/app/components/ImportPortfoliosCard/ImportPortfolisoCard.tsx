import { Card, CardActionArea, CardContent, Typography } from '@mui/material';
import { useNavigate } from '@remix-run/react';
import { useTranslation } from 'react-i18next';
import PortfolioGraphic from '../../../public/svg/portfolio.svg';

export const ImportPortfoliosCard = () => {
  const { t } = useTranslation(`portfolios`);
  const navigate = useNavigate();
  return (
    <Card variant="outlined" sx={{ height: `100%` }}>
      <CardActionArea
        sx={{ height: `100%` }}
        onClick={() => navigate(`/portfolios/import`)}
      >
        <CardContent>
          <PortfolioGraphic />
          <Typography variant="h5" textAlign="center">
            {t(`create_new`, `Import Portfolios`)}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};
