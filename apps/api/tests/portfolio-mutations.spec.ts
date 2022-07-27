import gql from 'graphql-tag';
import { ObjectId } from 'mongodb';
import { setupTestApp } from './jest/setup';
import { appMutate, appQuery } from './util/appRequest';
import { portfoliosCreatedQuery } from './util/queries/portfolio.test-queries';
import { portfoliosRemoveMultiple } from './util/mutations/portfolio.test-mutations';

describe('Portfolio Mutations', () => {
  beforeAll(async () => {
    await setupTestApp();
  });

  const initEmptyPortfolio = () =>
    appMutate(
      gql`
        mutation PortfoliosInitEmpty {
          portfoliosInitEmpty {
            _id
          }
        }
      `
    ).expectNoErrors();

  describe('portfoliosInitEmpty', () => {
    it('should iniatilise an empty portfolio and return the _id', async () => {
      const { data } = await initEmptyPortfolio();
      const createdId = data.portfoliosInitEmpty._id;

      const { data: portfolioData } = await appQuery(gql`
        query portfolio($_id: ObjectId!) {
          portfolio(_id: $_id) {
            owner {
              _id
              displayName
              photos
            }
            cash
            totalValue
          }
        }
      `)
        .variables({ _id: createdId })
        .expectNoErrors();

      expect(ObjectId.isValid(createdId));
      expect(portfolioData.portfolio).toMatchInlineSnapshot(`
        Object {
          "cash": 0,
          "owner": Object {
            "_id": "google-oauth1-233838",
            "displayName": "Warren Buffet",
            "photos": Array [
              "https://link.come/warrens_face.png",
            ],
          },
          "totalValue": 0,
        }
      `);
    });
  });

  describe('portfoliosRemoveOne', () => {
    it('should remove a single portfolio from the db', async () => {
      const { data } = await initEmptyPortfolio();

      const createdId = data.portfoliosInitEmpty._id;

      // Delete this new portfolio
      const { data: mutationData } = await appMutate(gql`
        mutation PortfoliosRemoveOne($_id: ObjectId!) {
          portfoliosRemoveOne(_id: $_id) {
            _id
          }
        }
      `)
        .variables({ _id: createdId })
        .expectNoErrors();

      expect(mutationData.portfoliosRemoveOne._id).toEqual(createdId);

      const { errors } = await appQuery(
        gql`
          query portfolio($_id: ObjectId!) {
            portfolio(_id: $_id) {
              _id
            }
          }
        `
      ).variables({ _id: createdId });

      expect(errors).toMatchInlineSnapshot(`
        Array [
          Object {
            "extensions": Object {
              "code": "404",
              "response": Object {
                "error": "Not Found",
                "message": "Could not find a portfolio with this id",
                "statusCode": 404,
              },
            },
            "message": "Could not find a portfolio with this id",
          },
        ]
      `);
    });
  });

  describe('portfoliosRemoveMultiple', () => {
    it('should remove multiple portfolios from the db', async () => {
      const {
        data: {
          portfoliosInitEmpty: { _id: firstId },
        },
      } = await initEmptyPortfolio();

      const {
        data: {
          portfoliosInitEmpty: { _id: secondId },
        },
      } = await initEmptyPortfolio();

      const {
        data: {
          portfoliosInitEmpty: { _id: thirdId },
        },
      } = await initEmptyPortfolio();

      // The portfolios should exist
      const { data } = await portfoliosCreatedQuery().expectNoErrors();

      const createdIds = data.portfoliosCreated.map((p) => p._id);

      expect(createdIds).toContain(firstId);
      expect(createdIds).toContain(secondId);
      expect(createdIds).toContain(thirdId);

      // We should be able to delete them all at once
      const { data: deleted } = await portfoliosRemoveMultiple()
        .variables({
          _ids: [firstId, secondId, thirdId],
        })
        .expectNoErrors();

      expect(deleted.portfoliosRemoveMultiple.acknowledged).toBe(true);
      expect(deleted.portfoliosRemoveMultiple.deletedCount).toEqual(3);
    });
  });
});
