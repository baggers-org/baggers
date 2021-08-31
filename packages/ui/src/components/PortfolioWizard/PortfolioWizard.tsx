import styled from 'styled-components';
import theme from '@/styles/theme';
import { Paper } from '@material-ui/core';
import PortfolioWizardDetails from './PortfolioWizardDetails';
import PortfolioWizardButtons from './PortfolioWizardButtons';
import PortfolioWizardAddPositions from './PortfolioWizardAddPositions';
import BaggersStepper from '../BaggersStepper/BaggersStepper';
import PortfolioWizardConfigure from './PortfolioWizardConfigure/PortfolioWizardConfigure';

const Container = styled.div`
  display: grid;
  padding: ${theme.spacing(2)};
  grid-template-rows: auto 1fr;
  height: 100%;
  min-height: 632px;
`;

const MainContent = styled.div`
  min-height: 600px;
  padding-left: ${theme.spacing(4)}px;
  padding-right: ${theme.spacing(4)}px;
  padding-top: ${theme.spacing(2)}px;
`;

type PortfolioWizardProps = {
  portfolioId?: string;
  step: number;
  onNextStep: () => void;
  onPreviousStep: () => void;
  onFinish: () => void;
};
const PortfolioWizard: React.FC<PortfolioWizardProps> = ({
  portfolioId,
  step,
  onNextStep,
  onPreviousStep,
  onFinish,
}) => {
  const steps = [
    `Enter portfolio details`,
    `Add positions`,
    `Configure portfolio`,
  ];
  return (
    <Container>
      <BaggersStepper steps={steps} activeStep={step} />
      <Paper>
        <MainContent>
          {step === 0 && <PortfolioWizardDetails portfolioId={portfolioId} />}

          {step === 1 && (
            <PortfolioWizardAddPositions portfolioId={portfolioId} />
          )}
          {step === 2 && <PortfolioWizardConfigure portfolioId={portfolioId} />}
        </MainContent>
      </Paper>
      <PortfolioWizardButtons
        step={step}
        maxSteps={3}
        onFinish={onFinish}
        onNext={onNextStep}
        onBack={onPreviousStep}
      />
    </Container>
  );
};

export default PortfolioWizard;
