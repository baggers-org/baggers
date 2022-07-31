import { User1 } from '@baggers/api-users';
import { TestSdk } from '~test-sdk';

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
  });
