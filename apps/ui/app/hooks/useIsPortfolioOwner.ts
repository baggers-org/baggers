import { useCurrentUser } from './useCurrentUser';
import { usePortfolio } from './usePortfolio';

export const useCanEditPortfolio = () => {
  const user = useCurrentUser();

  const canEdit = user?._id === usePortfolio()?.owner._id;

  return canEdit;
};
