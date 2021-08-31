import PortfolioWizard from '@/components/PortfolioWizard/PortfolioWizard';
import useEditPortfolio from '@/hooks/useEditPortfolio';
import { Container, Paper, Typography } from '@material-ui/core';
import { useRouter } from 'next/router';
import { useEffect, useMemo } from 'react';

const CreatePortfolioPage: React.FC = () => {
  const router = useRouter();

  const { createPortfolio } = useEditPortfolio();
  useEffect(() => {
    if (Object.keys(router.query).length === 0) return;
    if (!router.query.id) {
      console.log(`Creating portfolio`);
      createPortfolio();
    }
  }, [router.query]);
  const step = useMemo(() => {
    if (Array.isArray(router.query.step)) {
      return parseInt(router.query.step[0], 10);
    }
    if (router.query.step) {
      return parseInt(router?.query.step, 10);
    }
    return 1;
  }, [router.query]);

  let portfolioId = router.query.id;
  if (Array.isArray(router?.query.id)) {
    portfolioId = router?.query.id[0];
  } else {
    portfolioId = router?.query.id as string;
  }
  const nextStep = () => {
    router.push(`/portfolios/create/${step + 1}?id=${portfolioId}`);
  };
  const previousStep = () => {
    router.push(`/portfolios/create/${step - 1}?id=${portfolioId}`);
  };

  const onFinish = () => {
    router.push(`/portfolios/${portfolioId}`);
  };

  return (
    <Container maxWidth="lg">
      <PortfolioWizard
        portfolioId={portfolioId}
        step={step - 1}
        onNextStep={nextStep}
        onPreviousStep={previousStep}
        onFinish={onFinish}
      />
    </Container>
  );
};
export default CreatePortfolioPage;
