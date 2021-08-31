import CentredPaper from '@/components/util/CentredPaper';
import { Container, Grid, Typography } from '@material-ui/core';

export default () => {
  return (
    <Container maxWidth="xs">
      <CentredPaper padding="20px">
        <Grid container direction="column" spacing={4}>
          <Grid item>
            <Typography variant="h4">
              <strong>VERSION</strong>
            </Typography>
            <Typography variant="h4">
              {process.env.NODE_ENV !== `development`
                ? process.env.NEXT_PUBLIC_VERSION
                : `Development`}
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="h4">
              <strong>LAST UPDATED AT</strong>
            </Typography>
            <Typography variant="h4">
              {process.env.NODE_ENV !== `development`
                ? process.env.NEXT_PUBLIC_BUILD_TIME
                : `N/A`}
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="h4">
              <strong>BUILD ALIAS</strong>
            </Typography>
            <Typography variant="h4">
              {process.env.NODE_ENV !== `development`
                ? process.env.NEXT_PUBLIC_BUILD_ALIAS
                : `N/A`}
            </Typography>
          </Grid>
        </Grid>
      </CentredPaper>
    </Container>
  );
};
