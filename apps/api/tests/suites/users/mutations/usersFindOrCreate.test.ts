import { PartialTokenPayload } from '~/auth';
import { CreateUserInput, User1, User2 } from '~/users';
import { TestSdk } from '../../../test-sdk';

export const usersFindOrCreateTest = () =>
  describe('usersFindOrCreate', () => {
    it('should create the current user if they do not exist in the db', async () => {
      // Lets create a quick test user and put them into the db
      const newUser: PartialTokenPayload = {
        sub: 'new_user',
      };

      const dto = {
        _id: newUser.sub,
        displayName: 'Something',
        photos: ['photo'],
        emails: ['email'],
      };

      const sdk = TestSdk().setAuthHeader(newUser.sub).build();

      const { usersFindOrCreate } = await sdk.usersFindOrCreate({
        input: dto,
      });

      expect(usersFindOrCreate).toMatchInlineSnapshot(`
        {
          "_id": "new_user",
          "createdAt": "2022-01-17T00:00:00.000Z",
          "displayName": "Something",
          "emails": [
            "email",
          ],
          "photos": [
            "photo",
          ],
          "updatedAt": "2022-01-17T00:00:00.000Z",
        }
      `);
    });
    it('should return the current user if they already exist in the db', async () => {
      const dto: CreateUserInput = {
        _id: User1._id,
        displayName: 'Test',
        emails: ['test'],
        photos: ['test'],
      };

      const sdk = TestSdk().setAuthHeader(dto._id).build();

      const { usersFindOrCreate } = await sdk.usersFindOrCreate({
        input: dto,
      });

      expect(usersFindOrCreate).toMatchInlineSnapshot(`
        {
          "_id": "google-oauth1-233838",
          "createdAt": "2001-01-01T00:00:00.000Z",
          "displayName": "Test",
          "emails": [
            "test",
          ],
          "photos": [
            "test",
          ],
          "updatedAt": "2001-01-01T00:00:00.000Z",
        }
      `);
    });

    it('should only allow the current user to create "themself"', async () => {
      const dto: CreateUserInput = {
        _id: User2._id,
        displayName: 'Test',
        emails: ['test'],
        photos: ['test'],
      };

      const sdk = TestSdk().setAuthHeader(User1._id).build();

      try {
        await sdk.usersFindOrCreate({ input: dto });
      } catch (e) {
        expect(e).toMatchInlineSnapshot(
          `[Error: Unauthorized: {"response":{"errors":[{"message":"Unauthorized","extensions":{"code":"UNAUTHENTICATED","response":{"statusCode":401,"message":"Unauthorized"}}}],"data":null,"status":200,"headers":{}},"request":{"query":"mutation usersFindOrCreate($input: CreateUserInput!) {\\n  usersFindOrCreate(input: $input) {\\n    _id\\n    ...FullUser\\n  }\\n}\\n\\nfragment FullUser on User {\\n  _id\\n  displayName\\n  emails\\n  photos\\n  createdAt\\n  updatedAt\\n}","variables":{"input":{"_id":"fb-something123","displayName":"Test","emails":["test"],"photos":["test"]}}}}]`
        );
      }
      expect.assertions(1);
    });
  });
