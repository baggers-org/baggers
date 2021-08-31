import styled from 'styled-components';
import { Portfolio } from '@/graphql/Queries.document.gql';

const Container = styled.span``;

interface Props {
  selectedIndex: number;
  allPortfolios: Portfolio[] | undefined;
  onSelectPortfolio: (portfolio: Portfolio, index: number) => void;
}
const PortfolioSelect: React.FC<Props> = ({
  selectedIndex,
  allPortfolios,
  onSelectPortfolio,
}) => {
  return (
    <Container>
      <h2>{allPortfolios?.[selectedIndex]?.name}</h2>
    </Container>
  );
};

export default PortfolioSelect;
