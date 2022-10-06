import { Grid } from '@mui/material';
import { FromTheAuthor } from '~/components/PortfolioOverview/components/FromTheAuthor';

export default function PortfolioOverview() {
  return (
    <Grid container>
      <Grid item xs={12} lg={4}>
        <FromTheAuthor />
      </Grid>
    </Grid>
  );
}
