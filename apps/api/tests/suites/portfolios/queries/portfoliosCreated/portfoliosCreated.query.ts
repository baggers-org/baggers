import { gql } from 'graphql-tag';
import { appQuery } from '../../../../util/appRequest';

export const portfoliosCreatedQuery = gql`
  query PortfoliosCreated {
    portfoliosCreated {
      _id
      cash
      createdAt
      description
      name
      owner {
        _id
        createdAt
        displayName
        emails
        photos
        updatedAt
      }
      private
      top5Holdings {
        exposure
        marketValue
        costBasis
      }
      totalValue
      updatedAt
    }
  }
`;

export const portfoliosCreated = () => appQuery(portfoliosCreatedQuery);
