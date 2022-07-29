import { gql } from 'graphql-tag';
import { appMutate } from 'tests/util/appRequest';

export const portfoliosRemoveMultipleMutation = gql`
  mutation PortfoliosRemoveMultiple($_ids: [ObjectId!]!) {
    portfoliosRemoveMultiple(_ids: $_ids) {
      acknowledged
      deletedCount
    }
  }
`;
export const portfoliosRemoveMultiple = () =>
  appMutate(portfoliosRemoveMultipleMutation);
