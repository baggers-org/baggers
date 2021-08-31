import { Fade, Box, Paper, BoxProps } from '@material-ui/core';
import React from 'react';

type Props = {};
const CentredPaper: React.FC<Props & BoxProps> = ({
  children,
  ...boxProps
}) => {
  return (
    <Fade in>
      <Box
        display="flex"
        height="90vh"
        alignItems="center"
        flexDirection="column"
        justifyContent="center"
      >
        <Paper style={{ width: `100%` }}>
          <Box {...boxProps}>{children}</Box>
        </Paper>
      </Box>
    </Fade>
  );
};
export default CentredPaper;
