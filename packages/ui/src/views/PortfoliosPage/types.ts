import { Portfolio } from '@/graphql/Mutations.document.gql';

export interface BasePortfolioCardProps {
  portfolio: Portfolio;
  onOpenPortfolio: (portfolioId: string) => void;
}
