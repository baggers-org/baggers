import { Portfolio1 } from '~/portfolios';
import { User1Sdk, User2Sdk } from '~test-sdk';

export const portfoliosUpdateOneTests = () =>
  describe('portfoliosUpdateOne', () => {
    it('should update a single portfolio if you are the owner', async () => {
      // Create a portfolio so we dont interfer with other tests
      const {
        portfoliosInitEmpty: { _id },
      } = await User1Sdk().portfoliosInitEmpty();

      const { portfoliosUpdateOne } = await User1Sdk().portfoliosUpdateOne({
        _id,
        input: {
          name: 'My new portfolio',
          description: 'Description',
          cash: 2394,
          private: false,
        },
      });

      expect({ ...portfoliosUpdateOne, _id: undefined }).toMatchInlineSnapshot(`
        Object {
          "_id": undefined,
          "createdAt": "2022-01-17T00:00:00.000Z",
          "description": "Description",
          "name": "My new portfolio",
          "private": false,
          "updatedAt": "2022-01-17T00:00:00.000Z",
        }
      `);
    });

    it('should not allow invalid input', async () => {
      try {
        await User1Sdk().portfoliosUpdateOne({
          _id: Portfolio1._id,
          input: {
            cash: -238823993,
            description: ` 
			rreally 

			really 

			really really really really long
			`,
            name: '',
          },
        });
      } catch (e) {
        expect(e.response.errors).toMatchInlineSnapshot(`
          Array [
            Object {
              "extensions": Object {
                "code": "BAD_USER_INPUT",
                "response": Object {
                  "error": "Bad Request",
                  "message": Array [
                    "name should not be empty",
                    "cash must be a positive number",
                    "private must be a boolean value",
                  ],
                  "statusCode": 400,
                },
              },
              "message": "Bad Request Exception",
            },
          ]
        `);
      }
    });

    it('should return an error if you are not the owner', async () => {
      try {
        await User2Sdk().portfoliosUpdateOne({
          _id: Portfolio1._id,
          input: {
            name: 'H4Ck3D noob',
          },
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

      expect.assertions(1);
    });
  });
