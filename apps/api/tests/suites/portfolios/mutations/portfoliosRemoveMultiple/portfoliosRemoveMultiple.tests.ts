import { portfoliosCreated } from '../../queries';
import { portfoliosInitEmpty } from '../portfoliosInitEmpty';
import { portfoliosRemoveMultiple } from './portfoliosRemoveMultiple.mutation';

export const portfoliosRemoveMultipleTests = () =>
  describe('portfoliosRemoveMultiple', () => {
    it('should remove multiple portfolios from the db', async () => {
      const {
        data: {
          portfoliosInitEmpty: { _id: firstId },
        },
      } = await portfoliosInitEmpty();

      const {
        data: {
          portfoliosInitEmpty: { _id: secondId },
        },
      } = await portfoliosInitEmpty();

      const {
        data: {
          portfoliosInitEmpty: { _id: thirdId },
        },
      } = await portfoliosInitEmpty();

      // The portfolios should exist
      const { data } = await portfoliosCreated().expectNoErrors();

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
