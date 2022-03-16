import React from 'react';
import { Grid, Slide, Stack, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import AddManuallyGraphic from '../../../public/svg/edit.svg';
import LinkGraphic from '../../../public/svg/link.svg';
import CsvGraphic from '../../../public/svg/upload.svg';
import { AddFirstHoldingCard } from './AddFirstHoldingCard';

export type NoHoldingsProps = {
  onAddHoldingManuallyClick: () => void;
};
export const NoHoldings: React.FC<NoHoldingsProps> = ({
  onAddHoldingManuallyClick,
}) => {
  const { t } = useTranslation(`view_portfolio`);
  return (
    <Slide in direction="up">
      <Stack direction="column">
        <Typography variant="h4" color="mediumEmphasis">
          {t(
            `add_some_holdings_to_your_portfolio`,
            `Add some holdings to your portfolio`,
          )}
        </Typography>
        <Grid gridAutoFlow="column" gap={5} mt={4} container>
          <Grid item md>
            <AddFirstHoldingCard
              title={t(`add_holding_manually`, `Add holding manually`)}
              description={t(
                `add_holding_description`,
                `Search our database of tickers, and enter details about your holdings manually.`,
              )}
              buttonText={t(`add_holding_manually`, `Add holding manually`)}
              graphic={<AddManuallyGraphic />}
              onClick={onAddHoldingManuallyClick}
            />
          </Grid>
          <Grid item md>
            <AddFirstHoldingCard
              title={t(`link_your_broker`, `Link your broker`)}
              description={t(
                `link_broker_description`,
                `Give us permission to read your holdings directly from your broker.`,
              )}
              buttonText={t(`link_your_broker`, `Coming soon`)}
              graphic={<LinkGraphic />}
              onClick={onAddHoldingManuallyClick}
              isButtonDisabled
            />
          </Grid>
          <Grid item md>
            <AddFirstHoldingCard
              title={t(`import_via_csv`, `Import via CSV`)}
              description={t(
                `import_description`,
                `Use our CSV import wizard to upload a .csv file containing your holding data`,
              )}
              buttonText={t(`import_via_csv`, `Coming soon`)}
              graphic={<CsvGraphic />}
              onClick={onAddHoldingManuallyClick}
              isButtonDisabled
            />
          </Grid>
        </Grid>
      </Stack>
    </Slide>
  );
};
