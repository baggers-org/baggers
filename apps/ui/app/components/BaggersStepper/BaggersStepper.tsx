import { Stepper, Step, StepLabel } from '@mui/material';
import { BaggersConnector } from './Connector';
import { BaggersStepIcon } from './StepperIcon';

export interface BaggersStepperProps {
  steps: string[];
  activeStep: number;
}
export const BaggersStepper: React.FC<BaggersStepperProps> = ({
  activeStep,
  steps,
}) => {
  return (
    <Stepper
      activeStep={activeStep}
      alternativeLabel
      connector={<BaggersConnector />}
    >
      {steps.map((label) => (
        <Step key={label}>
          <StepLabel StepIconComponent={BaggersStepIcon}>{label}</StepLabel>
        </Step>
      ))}
    </Stepper>
  );
};
