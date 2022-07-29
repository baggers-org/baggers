import { gql } from 'apollo-server-express';
import { appQuery } from 'tests/util/appRequest';
import { portfoliosInitEmpty } from '../portfoliosInitEmpty';
import { portfoliosRemoveOne } from './portfoliosRemoveOne.query';

export const portfoliosRemoveOneTests = () =>
  describe('portfoliosRemoveOne', () => {
    it('should remove a single portfolio from the db', async () => {
      const { data } = await portfoliosInitEmpty();

      const createdId = data.portfoliosInitEmpty._id;

      // Delete this new portfolio
      const { data: mutationData } = await portfoliosRemoveOne()
        .variables({ _id: createdId })
        .expectNoErrors();

      expect(mutationData.portfoliosRemoveOne._id).toEqual(createdId);

      const { errors } = await appQuery(
        gql`
          query portfoliosFindById($_id: ObjectId!) {
            portfoliosFindById(_id: $_id) {
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
