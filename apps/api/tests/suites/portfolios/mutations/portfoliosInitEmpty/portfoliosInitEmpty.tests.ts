import { gql } from 'apollo-server-express';
import { ObjectId } from 'src/shared/classes/object-id';
import { appQuery } from 'tests/util/appRequest';
import { portfoliosInitEmpty } from './portfoliosInitEmpty.mutation';

export const portfoliosInitEmptyTests = () =>
  describe('portfoliosInitEmpty', () => {
    it('should iniatilise an empty portfolio and return the _id', async () => {
      const { data } = await portfoliosInitEmpty();
      const createdId = data.portfoliosInitEmpty._id;

      const { data: portfolioData } = await appQuery(gql`
        query portfoliosFindById($_id: ObjectId!) {
          portfoliosFindById(_id: $_id) {
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
      expect(portfolioData.portfoliosFindById).toMatchInlineSnapshot(`
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
