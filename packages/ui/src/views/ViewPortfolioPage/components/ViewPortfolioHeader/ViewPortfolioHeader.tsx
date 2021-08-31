import { Portfolio } from '@/graphql/Mutations.document.gql';
import { Grid, Avatar, Link as MuiLink } from '@material-ui/core';

import BaggersLink from '@/components/BaggersLink';
import BaggersTypography from '@/components/BaggersTypography/BaggersTypography';
import { Container } from './ViewPortfolioHeader.styles';

type Props = {
  portfolio: Portfolio;
};

const ViewPortfolioHeader: React.FC<Props> = ({ portfolio }) => {
  return (
    <Container>
      <Grid container alignItems="center">
        <Grid item xs={2} sm={1} justify="flex-start">
          <Avatar />
        </Grid>
        <Grid item xs={10} md={3} style={{ justifySelf: `baseline` }}>
          <BaggersTypography variant="h4" loading={!portfolio}>
            {portfolio?.name}
          </BaggersTypography>
          <BaggersLink href="/users" loading={!portfolio}>
            {portfolio?.owner?.split(`@`)[0]}
          </BaggersLink>
        </Grid>
      </Grid>
    </Container>
  );
};
export default ViewPortfolioHeader;
