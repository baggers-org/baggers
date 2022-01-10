import { Grid, Typography } from '@mui/material';
import { useTranslation } from 'next-i18next';
import { PositionDetailsProps } from './types';
import { useTranslatedPositionType } from './util';

export const BasicSummary: React.FC<PositionDetailsProps> = ({
  addingSymbol,
  positionDetails,
}) => {
  const { size, direction, type } = positionDetails;
  const { t } = useTranslation(`view_portfolio`);
  return (
    <Grid container px={6}>
      <Grid item xs={12} mt={2}>
        <Typography>
          {`${t(`adding`, `Adding`)} `} {size}
          {` `}
          <Typography display="inline" color="primary" fontWeight={800}>
            {addingSymbol.symbol}
            {` `}
          </Typography>
          <strong>
            {useTranslatedPositionType(type)} {direction}
            {` `}
          </strong>
          at current market price of <strong>$123</strong>
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
