import styled from 'styled-components';
import AddPhotoAlternateIcon from '@material-ui/icons/AddPhotoAlternate';
import useEditPortfolio from '@/hooks/useEditPortfolio';
import { Grid, Typography, Switch, FormControlLabel } from '@material-ui/core';
import Skeleton from 'react-loading-skeleton';

import { useRouter } from 'next/dist/client/router';
import { useEffect, useState } from 'react';
import theme from '@/styles/theme';
import BaggersTextField from '@/components/BaggersTextField/BaggersTextField';
import { useGetPortfolioByIdQuery } from '@/graphql/Queries.document.gql';

type Props = {
  portfolioId?: string;
};

const PortfolioLogoUpload = styled.div`
  width: 308px;
  height: 308px;
  background: ${theme.palette.grey[300]};
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border-radius: 4px;
  border: 1px dashed ${theme.palette.grey[200]};
  margin-top: ${theme.spacing(2)}px;

  :hover {
    border: 1px solid ${theme.palette.primary.main};
  }
  :focus {
    border: 4px dashed ${theme.palette.secondary.main};
  }

  svg {
    width: 150px;
    color: ${theme.palette.primary.main};
    height: 150px;
  }
`;

const PortfolioWizardDetails: React.FC<Props> = ({ portfolioId }) => {
  const { setName, setDescription, portfolio } = useEditPortfolio(portfolioId);

  return (
    <form
      autoComplete="off"
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      <Grid container>
        <Typography variant="subtitle1" color="textPrimary">
          PORTFOLIO DETAILS
        </Typography>
        <Grid container item xs={12}>
          <Grid item xs={12} md={4}>
            <PortfolioLogoUpload>
              <AddPhotoAlternateIcon />
            </PortfolioLogoUpload>
          </Grid>

          <Grid container item xs={12} md={8}>
            <Grid item xs={12}>
              <BaggersTextField
                fullWidth
                color="secondary"
                variant="outlined"
                margin="normal"
                loading={!portfolio}
                label="Portfolio name"
                defaultValue={portfolio?.name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <BaggersTextField
                multiline
                rows={10}
                fullWidth
                loading={!portfolio}
                color="secondary"
                variant="outlined"
                margin="normal"
                label="Description (optional)"
                defaultValue={portfolio?.description}
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </form>
  );
};

export default PortfolioWizardDetails;
