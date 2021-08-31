import { Stepper, StepLabel, Step, makeStyles } from '@material-ui/core';
import BaggersStepConnector from './BaggersStepConnector';
import BaggersStepIcon from './BaggersStepIcon';

type Props = {
  steps: Array<string>;
  activeStep: number;
};
const useStepperStyles = makeStyles((theme) => ({
  root: {
    background: theme.palette.grey[300],
  },
}));
const BaggersStepper: React.FC<Props> = ({ steps, activeStep }) => {
  const classes = useStepperStyles();
  return (
    <Stepper
      className={classes.root}
      alternativeLabel
      activeStep={activeStep}
      connector={<BaggersStepConnector />}
    >
      {steps.map((label) => (
        <Step>
          <StepLabel StepIconComponent={BaggersStepIcon}>{label}</StepLabel>
        </Step>
      ))}
    </Stepper>
  );
};

export default BaggersStepper;
