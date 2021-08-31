import BaggersTextField from '@/components/BaggersTextField/BaggersTextField';
import { Symbol } from '@/graphql/Mutations.document.gql';
import { Position } from '@/graphql/Queries.document.gql';
import theme from '@/styles/theme';
import { Grid, Typography } from '@material-ui/core';

import { useState, Dispatch, SetStateAction, useRef, useEffect } from 'react';
import { BasicContainer } from './AddPositionModal.styles';

const AddPositionBasicForm = ({
  setPosition,
}: {
  setPosition: Dispatch<SetStateAction<Position>>;
  symbol: Symbol;
}) => {
  const [numberOfShares, setNumberOfShares] = useState<number>(0);
  const [averagePrice, setAveragePrice] = useState<number>(0.0);
  const [costBasis, setCostBasis] = useState<number>(0.0);

  useEffect(() => {
    setPosition((position) => ({
      ...position,
      numberOfShares,
      averagePrice,
      costBasis,
    }));
  }, [costBasis, averagePrice, numberOfShares]);

  const updateNumberOfShares = (event: any) => {
    const noShares = event?.target?.value
      ? parseInt(event.target.value, 10)
      : 0;

    setNumberOfShares(noShares);
    setCostBasis(noShares * averagePrice);
  };
  const updateAveragePrice = (event: any) => {
    const avgPrice = event?.target?.value ? parseFloat(event.target.value) : 0;
    setAveragePrice(avgPrice);
    setCostBasis(numberOfShares * avgPrice);
  };

  return (
    <BasicContainer>
      <Typography variant="subtitle2" color="textSecondary">
        POSITION INFO
      </Typography>
      <Grid container style={{ marginTop: `${theme.spacing(2)}px` }}>
        <Grid item xs={12} md={4}>
          <BaggersTextField
            label="Number of Shares"
            color="secondary"
            onChange={updateNumberOfShares}
            autoFocus
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <BaggersTextField
            label="Average price per unit"
            color="secondary"
            isMonetaryInput
            onChange={updateAveragePrice}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <BaggersTextField
            label="Cost Basis"
            value={costBasis}
            disabled
            isMonetaryInput
          />
        </Grid>
      </Grid>
    </BasicContainer>
  );
};

export default AddPositionBasicForm;
