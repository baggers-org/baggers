import { Position, Symbol } from '@/graphql/Queries.document.gql';
import theme from '@/styles/theme';
import { Grid, Typography } from '@material-ui/core';
import { Dispatch, SetStateAction } from 'react';
import BaggersTextField from '../BaggersTextField/BaggersTextField';
import { AdvancedContainer } from './AddPositionModal.styles';

type Props = {
  symbol: Symbol;
  setPosition: Dispatch<SetStateAction<Position>>;
};
const AddPositionAdvancedForm: React.FC<Props> = ({ symbol, setPosition }) => {
  return (
    <AdvancedContainer>
      <Typography variant="subtitle2" color="textSecondary">
        ADVANCED
      </Typography>
      <Grid style={{ marginTop: `${theme.spacing(2)}px` }}>
        <Grid item>
          <BaggersTextField color="secondary" label="Broker fees" />
        </Grid>
      </Grid>
    </AdvancedContainer>
  );
};

export default AddPositionAdvancedForm;
