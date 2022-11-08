import { Security } from '@baggers/graphql-types';
import {
  Card,
  CardContent,
  Divider,
  Skeleton,
  Stack,
  Typography,
} from '@mui/material';
import React from 'react';
import { SecurityLogo } from '../SecurityLogo';

export type AddHoldingSecurityCardProps = {
  addingSecurity: Security;
  loading?: boolean;
};
export const AddHoldingSecurityCard: React.FC<AddHoldingSecurityCardProps> = ({
  addingSecurity,
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
          <SecurityLogo
            symbol={addingSecurity._id as string}
            includeSecurityLink={false}
            loading={loading}
          />
          <Typography mr={2}>
            {!loading ? addingSecurity?._id : <Skeleton width={100} />}
          </Typography>
          <Typography variant="subtitle1">
            {!loading ? addingSecurity?.name : <Skeleton width={150} />}
          </Typography>
          <Divider orientation="vertical" />
        </Stack>
      </CardContent>
    </Card>
  );
};
