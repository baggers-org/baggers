import gql from 'graphql-tag';
import { ObjectId } from 'mongodb';
import { setupTestApp } from './jest/setup';
import { appMutate, appQuery } from './util/appRequest';

describe('Portfolio Mutations', () => {
  beforeAll(async () => {
    await setupTestApp();
  });

  describe('portfoliosInitEmpty', () => {
    it('should iniatilise an empty portfolio and return the _id', async () => {
      const { data } = await appMutate(
        gql`
          mutation PortfoliosInitEmpty {
            portfoliosInitEmpty {
              _id
            }
          }
        `
      ).expectNoErrors();

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
      const { data } = await appMutate(gql`
        mutation portfoliosInitEmpty {
          portfoliosInitEmpty {
            _id
          }
        }
      `).expectNoErrors();

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
});
