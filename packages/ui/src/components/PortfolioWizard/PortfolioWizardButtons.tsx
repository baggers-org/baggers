import theme from '@/styles/theme';
import { Button } from '@material-ui/core';
import styled from 'styled-components';

const Container = styled.div`
  display: grid;
  grid-auto-flow: column;
  justify-content: right;
  margin-top: ${theme.spacing(2)}px;
`;

interface Props {
  step: number;
  maxSteps: number;
  onNext: () => void;
  onBack: () => void;
  onFinish: () => void;
}
const PortfolioWizardButtons: React.FC<Props> = ({
  step,
  maxSteps,
  onNext,
  onBack,
  onFinish,
}) => {
  const isLastStep = step === maxSteps - 1;
  return (
    <Container>
      {step > 0 && (
        <Button color="secondary" variant="contained" onClick={onBack}>
          Back
        </Button>
      )}
      <Button
        color="secondary"
        variant="contained"
        onClick={isLastStep ? onFinish : onNext}
      >
        {isLastStep ? `Create Portfolio` : `Next`}
      </Button>
    </Container>
  );
};

export default PortfolioWizardButtons;
