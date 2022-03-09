import { Card, CardActionArea, CardContent, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Form } from 'remix';

import PortfolioGraphic from '../../../public/svg/portfolio.svg';

export const CreatePortfolioCard = () => {
  const { t } = useTranslation(`portfolios_overview`);

  return (
    <Form method="post">
      <Card variant="outlined" sx={{ height: `100%` }}>
        <CardActionArea sx={{ height: `100%` }} type="submit">
          <CardContent>
            <PortfolioGraphic />
            <Typography variant="h5" textAlign="center">
              {t(`create_new`, `Create new portfolio`)}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Form>
  );
};
