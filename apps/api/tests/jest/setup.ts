import { INestApplication } from '@nestjs/common';
import { getConnectionToken, MongooseModule } from '@nestjs/mongoose';
import { Test } from '@nestjs/testing';
import { Connection } from 'mongoose';
import { AppModule } from '~/app.module';
import { JwtAuthGuard } from '~/auth/jwt.auth.guard';
import { createTestDb, TEST_DB_NAME } from 'tests/util/createTestDb';
import { MockAuthGuard } from 'tests/util/MockAuthGuard';

import { PartialTokenPayload } from '~/auth/types';

let connection: Connection;
let app: INestApplication;

beforeAll(() => {
  setupTestApp();
});

afterAll(async () => {
  if (connection) {
    await connection.close();
  }
  if (app) {
    await app.close();
  }
});
