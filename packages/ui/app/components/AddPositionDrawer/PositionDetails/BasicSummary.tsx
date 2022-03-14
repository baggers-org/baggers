import { Grid, Link, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { renderQuotePrice } from '~/util';
import { PositionDetailsProps } from './types';
import { useTranslatedPositionType } from './util';

export const BasicSummary: React.FC<PositionDetailsProps> = ({
  addingSymbol,
  addingPosition: positionDetails,
}) => {
  const { positionSize, direction, positionType } = positionDetails;
  const { t } = useTranslation(`view_portfolio`);
  return (
    <Grid container px={6}>
      <Grid item xs={12} mt={2}>
        <Typography fontWeight={200}>
          {`${t(`adding`, `Adding`)} `} {positionSize}
          {` `}
          <strong>
            {useTranslatedPositionType(positionType || `shares`, positionSize)}
            {` `}
            {direction === `short` ? t(`short`, `short`) : t(`long`, `long`)}
            {` of `}
          </strong>
          <Typography display="inline" color="primary" fontWeight={800}>
            <Link>{addingSymbol.symbol}</Link>
            {` `}
          </Typography>
          at current market price of{` `}
          <strong>{renderQuotePrice(addingSymbol.quote)}</strong>
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography fontSize="14px" fontWeight="light" color="mediumEmphasis">
          {t(`click_show_advanced`, `Click Show Advanced for more options`)}
        </Typography>
      </Grid>
    </Grid>
  );
};
