import { usePortfolio } from '~/hooks/usePortfolio';

export default function Holdings() {
  const portfolio = usePortfolio();
  return JSON.stringify(portfolio);
}
