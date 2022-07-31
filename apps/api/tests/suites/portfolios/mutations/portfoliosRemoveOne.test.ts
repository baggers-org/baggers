import { User1 } from '@baggers/api-users';
import { TestSdk } from '~test-sdk';

export const portfoliosRemoveOneTests = () =>
  describe('portfoliosRemoveOne', () => {
    it('should remove a single portfolio from the db', async () => {
      const sdk = TestSdk().setAuthHeader(User1._id).build();
      const { portfoliosInitEmpty } = await sdk.portfoliosInitEmpty();

      const createdId = portfoliosInitEmpty._id;

      // Delete this new portfolio
      const { portfoliosRemoveOne } = await sdk.portfoliosRemoveOne({
        _id: createdId,
      });

      expect(portfoliosRemoveOne._id).toEqual(createdId);

      try {
        await sdk.usersFindById({
          _id: createdId,
        });
      } catch (e) {
        expect(e.response.errors).toMatchInlineSnapshot(`
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
      }
    });
  });
