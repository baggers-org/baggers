import { useCurrentUser } from './useCurrentUser';
import { usePortfolio } from './usePortfolio';

export const useIsPortfolioOwner = () => {
  const user = useCurrentUser();

  const isPortfolioOwner = user?._id === usePortfolio()?.owner._id;

  return isPortfolioOwner;
};
