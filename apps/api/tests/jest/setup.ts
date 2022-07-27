import { INestApplication } from '@nestjs/common';
import { getConnectionToken, MongooseModule } from '@nestjs/mongoose';
import { Test } from '@nestjs/testing';
import { Connection } from 'mongoose';
import { AppModule } from 'src/app.module';
import { JwtAuthGuard } from 'src/auth/jwt.auth.guard';
import { createTestDb, TEST_DB_NAME } from 'tests/util/createTestDb';
import { MockAuthGuard } from 'tests/util/MockAuthGuard';

import { PartialTokenPayload } from 'src/auth/types';

let connection: Connection;
let app: INestApplication;

const setupTestDatabase = async () => {
  if (!globalThis.__MONGOD__) {
    globalThis.__MONGOD__ = await createTestDb();
  }
  return globalThis.__MONGOD__;
};

export const setUser = async (user?: PartialTokenPayload) => {
  const testingModule = await Test.createTestingModule({
    imports: [
      globalThis.__MONGOD__
        ? MongooseModule.forRoot(globalThis.__MONGOD__.getUri(), {
            dbName: TEST_DB_NAME,
          })
        : undefined,
      AppModule,
    ],
  })
    .overrideProvider(JwtAuthGuard)
    .useFactory({
      factory: () => {
        return new MockAuthGuard(user);
      },
    })
    .compile();

  connection = testingModule.get(getConnectionToken());

  app = testingModule.createNestApplication();

  await app.init();

  return app;
};

export const setupTestApp = async () => {
  await setupTestDatabase();
  const app = await setUser();
  globalThis.__APP__ = app;
};

afterAll(async () => {
  if (connection) {
    await connection.close();
  }
  if (app) {
    await app.close();
  }
});
