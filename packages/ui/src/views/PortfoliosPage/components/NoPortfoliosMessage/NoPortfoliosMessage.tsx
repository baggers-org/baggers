import { Button, Grid, Typography } from '@material-ui/core';
import { MoodBad } from '@material-ui/icons';

type Props = {
  onCreatePortfolio: () => {};
};
const NoPortfoliosMessage: React.FC<Props> = ({ onCreatePortfolio }) => {
  return (
    <Grid
      container
      alignItems="center"
      justify="center"
      direction="column"
      spacing={5}
      style={{ minHeight: `60vh` }}
    >
      <Grid container item xs={10} lg={7} spacing={4} justify="center">
        <Grid item>
          <Typography variant="h1" align="center">
            You have not created any portfolios
          </Typography>
        </Grid>
        <Grid item>
          <Typography variant="body1" align="center">
            Portfolios are a central part of the baggers experience. Track your
            net worth and share your positions with the world.
          </Typography>
        </Grid>
      </Grid>
      <Grid item>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => onCreatePortfolio()}
        >
          Create a portfolio
        </Button>
      </Grid>
    </Grid>
  );
};
export default NoPortfoliosMessage;
