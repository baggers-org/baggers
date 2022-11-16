import { User1, User2 } from '~/users';
import { TestSdk } from '../../../test-sdk';

export const usersFindByIdTest = () =>
  describe('usersFindById', () => {
    it('should fetch a single user, and show all fields if its the current user', async () => {
      const sdk = TestSdk().setAuthHeader(User1._id).build();

      const { usersFindById } = await sdk.usersFindById({
        _id: User1._id,
      });

      expect(usersFindById).toMatchInlineSnapshot(`
        {
          "_id": "google-oauth1-233838",
          "createdAt": "2001-01-01T00:00:00.000Z",
          "displayName": "Warren Buffet",
          "emails": [
            "wbuffet666@berkshire.com",
          ],
          "photos": [
            "https://link.come/warrens_face.png",
          ],
          "updatedAt": "2001-01-01T00:00:00.000Z",
        }
      `);
    });

    it('should fetch a single user, but hide private fields if its not the current user', async () => {
      const sdk = TestSdk().setAuthHeader(User1._id).build();

      const { usersFindById } = await sdk.usersFindById({
        _id: User2._id,
      });
      expect(usersFindById).toMatchInlineSnapshot(`
        {
          "_id": "fb-something123",
          "createdAt": "2001-01-01T00:00:00.000Z",
          "displayName": "Daniel Cooke",
          "emails": null,
          "photos": [
            "https://link.come/dans_face.png",
          ],
          "updatedAt": "2001-01-01T00:00:00.000Z",
        }
      `);
    });

    it('should allow admins to see the users email', async () => {
      const sdk = TestSdk().setAuthHeader(User2._id).build();

      const { usersFindById } = await sdk.usersFindById({
        _id: User2._id,
      });
      expect(usersFindById).toMatchInlineSnapshot(`
        {
          "_id": "fb-something123",
          "createdAt": "2001-01-01T00:00:00.000Z",
          "displayName": "Daniel Cooke",
          "emails": [
            "dcooke123@gmail.com",
          ],
          "photos": [
            "https://link.come/dans_face.png",
          ],
          "updatedAt": "2001-01-01T00:00:00.000Z",
        }
      `);
    });
  });
