import { gql } from 'graphql-tag';
import { appMutate } from 'tests/util/appRequest';

export const portfoliosInitEmptyMutation = gql`
  mutation PortfoliosInitEmpty {
    portfoliosInitEmpty {
      _id
    }
  }
`;
export const portfoliosInitEmpty = () =>
  appMutate(portfoliosInitEmptyMutation).expectNoErrors();
