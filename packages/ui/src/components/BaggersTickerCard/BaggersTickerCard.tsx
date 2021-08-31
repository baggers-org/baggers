import styled from 'styled-components';
import { Symbol } from '@/graphql/Queries.document.gql';
import { Avatar, Paper } from '@material-ui/core';
import theme from '@/styles/theme';

const Container = styled(Paper)`
  display: grid;
  grid-auto-flow: column;
  grid-template-columns: 0.25fr 0.25fr 4fr;
  grid-gap: 30px;
  padding: ${theme.spacing(2)}px;
  width: 100%;
  align-items: center;
  span {
    font-weight: bold;
  }
`;

type Props = {
  symbol: Symbol;
  logoUrl?: string;
};
const BaggersSymbolCard: React.FC<Props> = ({ symbol, logoUrl }) => {
  return (
    <Container>
      <Avatar src={logoUrl} />
      <span>{symbol.symbol}</span>
      <span>{symbol.securityName}</span>
      <span>{symbol.exchange}</span>
      <span>{symbol.country}</span>
    </Container>
  );
};

export default BaggersSymbolCard;
