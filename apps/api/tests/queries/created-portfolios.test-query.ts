import gql from 'graphql-tag';

export const CreatedPortfoliosQuery = gql`
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
