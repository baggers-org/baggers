import { gql } from 'graphql-tag';
import { appMutate } from 'tests/util/appRequest';

export const portfoliosUpdateOneMutation = gql`
  mutation PortfoliosUpdateOne($id: ObjectId!, $input: UpdatePortfolioInput!) {
    portfoliosUpdateOne(_id: $id, input: $input) {
      name
      cash
      description
      private
    }
  }
`;

export const portfoliosUpdateOne = () => appMutate(portfoliosUpdateOneMutation);
