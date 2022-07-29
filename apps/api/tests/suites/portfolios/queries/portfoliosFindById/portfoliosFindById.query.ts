import { gql } from 'graphql-tag';
import { appQuery } from '../../../../util/appRequest';

export const portfoliosFindByIdQuery = gql`
  query Portfolio($id: ObjectId!) {
    portfoliosFindById(_id: $id) {
      _id
      cash
      createdAt
      description
      holdings {
        averagePrice
        brokerFees
        costBasis
        currency
        dailyProfitLossUsd
        direction
        exposure
        marketValue
        profitLossPercent
        profitLossUsd
        quantity
        source
        ticker {
          _id
          cik
          createdAt
          currency
          exchange
          exchangeName
          figi
          iexId
          name
          quote {
            avgTotalVolume
            calculationPrice
            change
            changePercent
            close
            closeSource
            closeTime
            companyName
            currency
            delayedPrice
            delayedPriceTime
            extendedChange
            extendedChangePercent
            extendedPrice
            extendedPriceTime
            high
            highSource
            highTime
            iexAskPrice
            iexAskSize
            iexBidPrice
            iexBidSize
            iexClose
            iexCloseTime
            iexLastUpdated
            iexMarketPercent
            iexOpen
            iexOpenTime
            iexRealtimePrice
            iexRealtimeSize
            iexVolume
            isUSMarketOpen
            lastTradeTime
            latestPrice
            latestSource
            latestTime
            latestUpdate
            latestVolume
            low
            lowSource
            lowTime
            marketCap
            oddLotDelayedPrice
            oddLotDelayedPriceTime
            open
            openSource
            openTime
            peRatio
            previousClose
            previousVolume
            primaryExchange
            symbol
            volume
            week52High
            week52Low
            ytdChange
          }
          region
          symbol
          symbolType
          updatedAt
        }
        type
      }
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
      totalValue
      transactions {
        currency
        date
        name
        price
        quantity
        subType
        type
      }
      updatedAt
    }
  }
`;

export const portfoliosFindById = () => appQuery(portfoliosFindByIdQuery);
