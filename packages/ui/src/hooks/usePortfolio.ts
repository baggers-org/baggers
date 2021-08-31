import { Portfolio } from '@/graphql/Mutations.document.gql';
import { useGetPortfolioByIdLazyQuery } from '@/graphql/Queries.document.gql';
import { useEffect } from 'react';

const usePortfolio = (id: string) => {
  const [fetchPortfolio, { data }] = useGetPortfolioByIdLazyQuery({
    returnPartialData: true,
  });

  useEffect(() => {
    if (id) {
      fetchPortfolio({
        variables: {
          id,
        },
      });
    }
  }, [id, fetchPortfolio]);

  return data?.getPortfolioById as Portfolio;
};

export default usePortfolio;
