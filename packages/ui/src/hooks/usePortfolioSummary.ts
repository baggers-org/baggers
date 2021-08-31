import { Portfolio } from '@/graphql/Mutations.document.gql';
import { useGetPortfolioSummaryByIdLazyQuery } from '@/graphql/Queries.document.gql';
import { useEffect } from 'react';

const usePortfolioSummary = (id?: string) => {
  const [fetchPortfolio, { data }] = useGetPortfolioSummaryByIdLazyQuery({
    fetchPolicy: `cache-only`,
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

export default usePortfolioSummary;
