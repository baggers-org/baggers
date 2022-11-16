import { JwtAuthGuard } from '~/auth';
import { MongooseModule } from '@nestjs/mongoose';
import { Test } from '@nestjs/testing';
import { createTestDb, TEST_DB_NAME } from './createTestDb';
import { MockAuthGuard } from './MockAuthGuard';
import { AppModule } from '../../src/app.module';
import { INestApplication } from '@nestjs/common';
import { setupApp } from '../../src/setupApp';

const setupTestDatabase = async () => {
  if (!global.__MONGOD__) {
    global.__MONGOD__ = await createTestDb();
  }
  return global.__MONGOD__;
};
export const setupTestApp = async (): Promise<INestApplication> => {
  await setupTestDatabase();
  const testingModule: any = await Test.createTestingModule({
    imports: [
      global.__MONGOD__
        ? (MongooseModule.forRoot(global.__MONGOD__.getUri(), {
            dbName: TEST_DB_NAME,
          }) as any)
        : undefined,
      AppModule,
    ],
  })
    .overrideProvider(JwtAuthGuard)
    .useClass(MockAuthGuard)
    .compile();

  const app = testingModule.createNestApplication();
  setupApp(app);

  await app.init();

  try {
    await app.listen(4000);
  } catch (e) {
    //
  }

  return app;
};
