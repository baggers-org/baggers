import React from 'react';
import { Button, Grid, Slide, Stack, Tooltip, Typography } from '@mui/material';
import { useTranslation } from 'next-i18next';
import AddManuallyGraphic from '../../../../../../public/svg/edit.svg';
import LinkGraphic from '../../../../../../public/svg/link.svg';
import CsvGraphic from '../../../../../../public/svg/upload.svg';
import { AddFirstPositionCard } from './AddFirstPositionCard';

export type NoPositionsProps = {
  onAddPositionManuallyClick: () => void;
};
export const NoPositions: React.FC<NoPositionsProps> = ({
  onAddPositionManuallyClick,
}) => {
  const { t } = useTranslation(`view_portfolio`);
  return (
    <Slide in direction="up">
      <Stack direction="column">
        <Typography variant="h4" color="mediumEmphasis">
          {t(
            `add_some_positions_to_your_portfolio`,
            `Add some positions to your portfolio`,
          )}
        </Typography>
        <Grid gridAutoFlow="column" gap={5} mt={4} container>
          <Grid item md>
            <AddFirstPositionCard
              title={t(`add_position_manually`, `Add position manually`)}
              description={t(
                `add_position_description`,
                `Search our database of tickers, and enter details about your positions manually.`,
              )}
              buttonText={t(`add_position_manually`, `Add position manually`)}
              graphic={<AddManuallyGraphic />}
              onClick={onAddPositionManuallyClick}
            />
          </Grid>
          <Grid item md>
            <AddFirstPositionCard
              title={t(`link_your_broker`, `Link your broker`)}
              description={t(
                `link_broker_description`,
                `Give us permission to read your positions directly from your broker.`,
              )}
              buttonText={t(`link_your_broker`, `Coming soon`)}
              graphic={<LinkGraphic />}
              onClick={onAddPositionManuallyClick}
              isButtonDisabled
            />
          </Grid>
          <Grid item md>
            <AddFirstPositionCard
              title={t(`import_via_csv`, `Import via CSV`)}
              description={t(
                `import_description`,
                `Use our CSV import wizard to upload a .csv file containing your position data`,
              )}
              buttonText={t(`import_via_csv`, `Coming soon`)}
              graphic={<CsvGraphic />}
              onClick={onAddPositionManuallyClick}
              isButtonDisabled
            />
          </Grid>
        </Grid>
      </Stack>
    </Slide>
  );
};
