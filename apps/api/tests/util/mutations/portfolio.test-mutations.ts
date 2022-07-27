import { appMutate } from '../appRequest';
import { gql } from 'graphql-tag';

export const portfoliosRemoveMultiple = () =>
  appMutate(gql`
    mutation PortfoliosRemoveMultiple($_ids: [ObjectId!]!) {
      portfoliosRemoveMultiple(_ids: $_ids) {
        acknowledged
        deletedCount
      }
    }
  `);
