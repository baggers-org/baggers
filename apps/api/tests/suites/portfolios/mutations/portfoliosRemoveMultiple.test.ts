import { User1 } from '@baggers/api-users';
import { TestSdk, User1Sdk, User2Sdk } from '~test-sdk';

export const portfoliosRemoveMultipleTests = () =>
  describe('portfoliosRemoveMultiple', () => {
    it('should remove multiple portfolios from the db', async () => {
      const sdk = TestSdk().setAuthHeader(User1._id).build();

      const {
        portfoliosInitEmpty: { _id: id1 },
      } = await sdk.portfoliosInitEmpty();

      const {
        portfoliosInitEmpty: { _id: id2 },
      } = await sdk.portfoliosInitEmpty();

      const {
        portfoliosInitEmpty: { _id: id3 },
      } = await sdk.portfoliosInitEmpty();

      // The portfolios should exist
      const { portfoliosCreated } = await sdk.portfoliosCreated();

      const createdIds = portfoliosCreated.map((p) => p._id);

      expect(createdIds).toContain(id1);
      expect(createdIds).toContain(id2);
      expect(createdIds).toContain(id3);

      // We should be able to delete them all at once
      const { portfoliosRemoveMultiple } = await sdk.portfoliosRemoveMultiple({
        _ids: [id1, id2, id3],
      });

      expect(portfoliosRemoveMultiple.acknowledged).toBe(true);
      expect(portfoliosRemoveMultiple.deletedCount).toEqual(3);
    });

    it('should return an error if you are not the owner', async () => {
      const {
        portfoliosInitEmpty: { _id: id1 },
      } = await User1Sdk().portfoliosInitEmpty();
      const {
        portfoliosInitEmpty: { _id: id2 },
      } = await User1Sdk().portfoliosInitEmpty();

      // Try to delete them as user 2
      try {
        await User2Sdk().portfoliosRemoveMultiple({
          _ids: [id1, id2],
        });
      } catch (e) {
        expect(e.response.errors).toMatchInlineSnapshot(`
          Array [
            Object {
              "extensions": Object {
                "code": "404",
                "response": Object {
                  "error": "Not Found",
                  "message": "Could not find any portfolios to delete",
                  "statusCode": 404,
                },
              },
              "message": "Could not find any portfolios to delete",
            },
          ]
        `);
      }

      expect.assertions(1);
    });
  });
