import { StepConnector, stepConnectorClasses, styled } from '@mui/material';

export const BaggersConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 10,
    left: `calc(-50% + 16px)`,
    right: `calc(50% + 16px)`,
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: theme.palette.primary.main,
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: theme.palette.primary.main,
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    borderColor:
      theme.palette.mode === `dark` ? theme.palette.grey[800] : `#eaeaf0`,
    borderTopWidth: 3,
    borderRadius: 1,
  },
}));
