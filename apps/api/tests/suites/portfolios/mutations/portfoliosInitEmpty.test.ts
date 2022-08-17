import { ObjectId } from '~/shared';
import { User1 } from '~/users';
import { TestSdk } from '~test-sdk';

export const portfoliosInitEmptyTests = () =>
  describe('portfoliosInitEmpty', () => {
    it('should iniatilise an empty portfolio and return the _id', async () => {
      const sdk = TestSdk().setAuthHeader(User1._id).build();

      const { portfoliosInitEmpty } = await sdk.portfoliosInitEmpty();

      const createdId = portfoliosInitEmpty._id;

      const { portfoliosFindById: createdPortfolio } =
        await sdk.portfoliosFindById({
          _id: createdId,
        });

      expect(ObjectId.isValid(createdId));
      expect({ ...createdPortfolio, _id: undefined }).toMatchInlineSnapshot(`
        Object {
          "_id": undefined,
          "cash": 0,
          "createdAt": "2022-01-17T00:00:00.000Z",
          "description": "",
          "holdings": Array [],
          "name": "",
          "owner": Object {
            "_id": "google-oauth1-233838",
            "createdAt": "2001-01-01T00:00:00.000Z",
            "displayName": "Warren Buffet",
            "emails": Array [
              "wbuffet666@berkshire.com",
            ],
            "photos": Array [
              "https://link.come/warrens_face.png",
            ],
            "updatedAt": "2001-01-01T00:00:00.000Z",
          },
          "plaidAccountId": null,
          "plaidAccountType": null,
          "private": true,
          "totalValue": 0,
          "transactions": Array [],
          "updatedAt": "2022-01-17T00:00:00.000Z",
        }
      `);
    });
  });
