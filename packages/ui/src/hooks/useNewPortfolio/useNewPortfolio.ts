import { useCreatePortfolioMutation } from '@/graphql/Mutations.document.gql';
import { useRouter } from 'next/router';
import { usePrefetch } from '..';

export const useNewPortfolio = () => {
  const { push } = useRouter();
  usePrefetch(`/portfolios/new`);

  const [createPortfolio] = useCreatePortfolioMutation();

  const createNewPortfolio = async () => {
    const portfolio = await createPortfolio({
      variables: {
        record: {
          name: ``,
          description: ``,
        },
      },
    });

    const newPortfolioId = portfolio?.data?.createPortfolio?.record?._id;
    push(`/portfolios/${newPortfolioId}`);
  };

  return {
    createNewPortfolio,
  };
};
