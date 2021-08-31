import theme from '@/styles/theme';
import { Box, Divider, Grid } from '@material-ui/core';
import React from 'react';
import BaggersTypography from '../BaggersTypography/BaggersTypography';

type Props = {
  changePercentYTD: number;
  changeYTD: number;
  changePercentDaily: number;
  changeDaily: number;
};

type Return = {
  percent: number;
  monetary: number;
};
const ReturnsWidget: React.FC<Props> = () => {
  const renderReturnSection = (label: string, ret: Return) => {
    const color =
      ret.monetary > 0 ? theme.palette.success.main : theme.palette.error.main;
    return (
      <Grid
        container
        item
        xs={3}
        direction="column"
        justify="center"
        alignItems="center"
      >
        <Box>
          <BaggersTypography color="textSecondary" variant="body2">
            {label}
          </BaggersTypography>
          <BaggersTypography style={{ color }} variant="h6">
            ${ret.monetary} ({ret.percent}%)
          </BaggersTypography>
        </Box>
      </Grid>
    );
  };
  return (
    <Grid container justify="center">
      {renderReturnSection(`RETURN`, {
        monetary: 4001231,
        percent: 12.5,
      })}
      <Divider orientation="vertical" flexItem />
      {renderReturnSection(`RETURN YTD`, {
        monetary: 123,
        percent: 123,
      })}
      <Divider orientation="vertical" flexItem />
      {renderReturnSection(`RETURN TODAY`, {
        monetary: -123,
        percent: -1,
      })}
    </Grid>
  );
};
export default ReturnsWidget;
