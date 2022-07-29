import request from 'supertest-graphql';

import gql from 'graphql-tag';
import { User1, User2 } from 'tests/data/user.test-data';
import { setupTestApp, setUser } from './jest/setup';
import { PartialTokenPayload } from '~/auth/types';
import { INestApplication } from '@nestjs/common';
import { CreateUserInput } from '~/users/dto/create-user.input';

describe('Users', () => {
  beforeAll(async () => {
    await setupTestApp();
  });

  describe('user', () => {
    const userQuery = (
      idToQuery: string,
      app: INestApplication = globalThis.__APP__
    ) =>
      request<any>(app.getHttpServer())
        .query(
          gql`
            query user($_id: ID!) {
              user(_id: $_id) {
                _id
                displayName
                emails
                photos
                createdAt
                updatedAt
              }
            }
          `
        )
        .variables({
          _id: idToQuery,
        });
    it('should fetch a single user, and show all fields if its the current user', async () => {
      const { data } = await userQuery(User1._id).expectNoErrors();
      expect(data).toMatchInlineSnapshot(`
        Object {
          "user": Object {
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
        }
      `);
    });

    it('should fetch a single user, but hide private fields if its not the current user', async () => {
      const { data } = await userQuery(User2._id).expectNoErrors();

      expect(data).toMatchInlineSnapshot(`
        Object {
          "user": Object {
            "_id": "fb-something123",
            "createdAt": "2001-01-01T00:00:00.000Z",
            "displayName": "Daniel Cooke",
            "emails": null,
            "photos": Array [
              "https://link.come/dans_face.png",
            ],
            "updatedAt": "2001-01-01T00:00:00.000Z",
          },
        }
      `);
    });

    it('should allow admins to see the users email', async () => {
      const app = await setUser({
        'https://baggers.app/role': ['admin'],
      });
      const { data } = await userQuery(User2._id, app);
      expect(data).toMatchInlineSnapshot(`
        Object {
          "user": Object {
            "_id": "fb-something123",
            "createdAt": "2001-01-01T00:00:00.000Z",
            "displayName": "Daniel Cooke",
            "emails": Array [
              "dcooke123@gmail.com",
            ],
            "photos": Array [
              "https://link.come/dans_face.png",
            ],
            "updatedAt": "2001-01-01T00:00:00.000Z",
          },
        }
      `);
    });
  });

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

      const app = await setUser(newUser);

      const { data } = await request<any>(app.getHttpServer())
        .query(
          gql`
            mutation usersFindOrCreate($input: CreateUserInput!) {
              usersFindOrCreate(input: $input) {
                _id
                displayName
                photos
                emails
              }
            }
          `
        )
        .variables({
          input: dto,
        })
        .expectNoErrors();

      expect(data.usersFindOrCreate).toEqual(dto);
    });
    it('should return the current user if they already exist in the db', async () => {
      const dto: CreateUserInput = {
        _id: User1._id,
        displayName: 'Test',
        emails: ['test'],
        photos: ['test'],
      };
      const { data } = await request<any>(globalThis.__APP__.getHttpServer())
        .query(
          gql`
            mutation usersFindOrCreate($input: CreateUserInput!) {
              usersFindOrCreate(input: $input) {
                _id
                displayName
                photos
                emails
              }
            }
          `
        )
        .variables({
          input: dto,
        })
        .expectNoErrors();

      expect(data.usersFindOrCreate).toEqual(dto);
    });

    it('should only allow the current user to create "themself"', async () => {
      const dto: CreateUserInput = {
        _id: User2._id,
        displayName: 'Test',
        emails: ['test'],
        photos: ['test'],
      };
      const { errors } = await request<any>(globalThis.__APP__.getHttpServer())
        .query(
          gql`
            mutation usersFindOrCreate($input: CreateUserInput!) {
              usersFindOrCreate(input: $input) {
                _id
                displayName
                photos
                emails
              }
            }
          `
        )
        .variables({
          input: dto,
        });

      expect(errors).toMatchInlineSnapshot(`
        Array [
          Object {
            "extensions": Object {
              "code": "UNAUTHENTICATED",
              "response": Object {
                "message": "Unauthorized",
                "statusCode": 401,
              },
            },
            "message": "Unauthorized",
          },
        ]
      `);
    });
  });
});
