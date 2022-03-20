import { Check } from '@mui/icons-material';
import { CircularProgress, styled } from '@mui/material';

const IconRoot = styled(`div`)(({ theme, ownerState }) => ({
  color: theme.palette.grey[700],
  display: `flex`,
  height: 22,
  alignItems: `center`,
  ...(ownerState.active && {
    color: theme.palette.primary.main,
  }),
  '& .BaggersStepIcon-completedIcon': {
    color: theme.palette.primary.main,
    zIndex: 1,
    fontSize: 18,
  },
  'div.BaggersStepIcon-circle': {
    width: 8,
    height: 8,
    borderRadius: `50%`,
    backgroundColor: `currentColor`,
  },
}));

export function BaggersStepIcon(props) {
  const { active, completed, className } = props;

  return (
    <IconRoot ownerState={{ active }} className={className}>
      {completed && <Check className=".BaggersStepIcon-completedIcon" />}
      {active && <CircularProgress size={32} />}
      {!active || !completed ? (
        <div className=".BaggersStepIcon-circle" />
      ) : null}
    </IconRoot>
  );
}
