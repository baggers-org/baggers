import { gql } from 'graphql-tag';

import { appMutate } from 'tests/util/appRequest';
export const portfoliosRemoveOneMutation = gql`
  mutation PortfoliosRemoveOne($_id: ObjectId!) {
    portfoliosRemoveOne(_id: $_id) {
      _id
    }
  }
`;
export const portfoliosRemoveOne = () => appMutate(portfoliosRemoveOneMutation);
