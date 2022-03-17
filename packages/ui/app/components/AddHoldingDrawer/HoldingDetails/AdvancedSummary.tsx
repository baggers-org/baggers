import { Grid, Link, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { formatCurrency } from '~/util';
import { HoldingDetailsProps } from './types';

export const AdvancedSummary: React.FC<HoldingDetailsProps> = ({
  addingSymbol,
  addingHolding: holdingDetails,
  loadingOpenPrice,
}) => {
  const { t } = useTranslation(`view_portfolio`);
  return (
    <Grid item xs={12} pt={2} px={6}>
      <Typography color="primary" fontWeight="bold">
        {addingSymbol.symbol}
        {` `}
        <Typography display="inline" color="mediumEmphasis" fontWeight="light">
          {t(`was_trading_at`, `was trading at`)}
          {` `}
          <strong style={{ opacity: loadingOpenPrice ? 0.2 : 1 }}>
            {formatCurrency(
              holdingDetails.averagePrice,
              holdingDetails?.currency || `USD`,
            )}
          </strong>
          {` `}
          {t(`on_the`, `on the`)}
          {` `}
          <strong>
            {/* {format(holdingDetails.openDate, `do LLL Y`)} at market close */}
          </strong>
          <Typography color="mediumEmphasis" fontWeight="light" fontSize="14px">
            {t(`not_quite_right`, `Not quite right?`)}
            {` `}
            <Link
              fontWeight="bold"
              sx={{
                textDecoration: `none`,
                cursor: `pointer`,
                ':hover': {
                  textDecoration: `underline`,
                },
              }}
            >
              {t(`click_here_to_fine_tune`, `Click here to fine tune`)}
            </Link>
          </Typography>
        </Typography>
      </Typography>
    </Grid>
  );
};
