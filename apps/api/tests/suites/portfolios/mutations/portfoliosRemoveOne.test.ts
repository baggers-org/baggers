import { User1 } from '~/users';
import { TestSdk, User1Sdk, User2Sdk } from '~test-sdk';

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
        await sdk.portfoliosFindById({
          _id: createdId,
        });
      } catch (e) {
        expect(e.response.errors).toMatchInlineSnapshot(`
          [
            {
              "extensions": {
                "code": "404",
                "response": {
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

    it('should return an error if you are not the owner', async () => {
      const {
        portfoliosInitEmpty: { _id },
      } = await User1Sdk().portfoliosInitEmpty();
      try {
        await User2Sdk().portfoliosRemoveOne({
          _id,
        });
      } catch (e) {
        expect(e.response.errors).toMatchInlineSnapshot(`
          [
            {
              "extensions": {
                "code": "404",
                "response": {
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
      expect.assertions(1);
    });
  });
