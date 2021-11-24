import {
  Portfolio,
  useMyPortfoliosQuery,
} from '@/graphql/Queries.document.gql';
import { useEffect, useState } from 'react';

export const usePortfolios = () => {
  const { data } = useMyPortfoliosQuery();

  const [allPortfolios, setAllPortfolios] = useState<Portfolio[]>();

  const [selectedPortfolio, setSelectedPortfolio] = useState<
    Portfolio | undefined
  >();

  // Set default portfolio as the first portfolio - this can maybe be configured by the user
  const [selectedPortfolioIndex, setSelectedPortfolioIndex] = useState<number>(
    0,
  );

  useEffect(() => {
    if (data?.myPortfolios) {
      setAllPortfolios(data.myPortfolios as Portfolio[]);
      setSelectedPortfolio(
        data?.myPortfolios[selectedPortfolioIndex] as Portfolio,
      );
    }
  }, [data]);

  return {
    allPortfolios,
    selectedPortfolio,
    selectedPortfolioIndex,
    selectPortfolio: (index: number) => {
      if (!allPortfolios) {
        return;
      }
      setSelectedPortfolio(allPortfolios[index]);
      setSelectedPortfolioIndex(index);
    },
  };
};
