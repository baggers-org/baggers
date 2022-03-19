import { Check } from '@mui/icons-material';
import { styled } from '@mui/material';

const IconRoot = styled(`div`)(({ theme, ownerState }) => ({
  color: theme.palette.mode === `dark` ? theme.palette.grey[700] : `#eaeaf0`,
  display: `flex`,
  height: 22,
  alignItems: `center`,
  ...(ownerState.active && {
    color: `#784af4`,
  }),
  '& .BaggersStepIcon-completedIcon': {
    color: `#784af4`,
    zIndex: 1,
    fontSize: 18,
  },
  '& .BaggersStepIcon-circle': {
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
      {completed ? (
        <Check className=".BaggersStepIcon-completedIcon" />
      ) : (
        <div className=".BaggersStepIcon-circle" />
      )}
    </IconRoot>
  );
}
