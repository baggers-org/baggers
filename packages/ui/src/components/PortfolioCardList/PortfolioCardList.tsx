import { Portfolio } from '@/graphql/Mutations.document.gql';
import { Grid } from '@material-ui/core';
import Skeleton from 'react-loading-skeleton';
import { BasePortfolioCardProps } from '../../views/PortfoliosPage/types';
import MyPortfolioCard from '../../views/PortfoliosPage/components/MyPortfolioCard/MyPortfolioCard';

type Props = {
  portfolios?: Portfolio[];
  onOpenPortfolio: BasePortfolioCardProps['onOpenPortfolio'];
  PortfolioCard: React.FC<BasePortfolioCardProps>;
};
const PortfolioCardList: React.FC<Props> = ({
  portfolios,
  PortfolioCard,
  onOpenPortfolio,
}) => {
  const PC = PortfolioCard || MyPortfolioCard;
  return (
    <Grid container spacing={2} direction="row" alignItems="center">
      {!portfolios ? (
        <Skeleton />
      ) : (
        portfolios.map((portfolio) => (
          <Grid item xs={12} md={3}>
            <PC portfolio={portfolio} onOpenPortfolio={onOpenPortfolio} />
          </Grid>
        ))
      )}
    </Grid>
  );
};
export default PortfolioCardList;
