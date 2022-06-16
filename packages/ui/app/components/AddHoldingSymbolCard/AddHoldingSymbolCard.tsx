import {
  Card,
  CardContent,
  Divider,
  Skeleton,
  Stack,
  Typography,
} from '@mui/material';
import React from 'react';
import { Symbol } from '~/generated/graphql';
import { SymbolLogo } from '../SymbolLogo';

export type AddHoldingSymbolCardProps = {
  addingSymbol: Symbol;
  loading?: boolean;
};
export const AddHoldingSymbolCard: React.FC<AddHoldingSymbolCardProps> = ({
  addingSymbol,
  loading,
}) => {
  return (
    <Card>
      <CardContent>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <SymbolLogo
            symbol={addingSymbol}
            includeSymbolLink={false}
            loading={loading}
          />
          <Typography mr={2}>
            {!loading ? addingSymbol?.symbol : <Skeleton width={100} />}
          </Typography>
          <Typography variant="subtitle1">
            {!loading ? addingSymbol?.name : <Skeleton width={150} />}
          </Typography>
          <Divider orientation="vertical" />
        </Stack>
      </CardContent>
    </Card>
  );
};
