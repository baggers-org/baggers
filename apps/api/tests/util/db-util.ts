import { JwtAuthGuard } from '~/auth';
import { MongooseModule } from '@nestjs/mongoose';
import { Test } from '@nestjs/testing';
import { createTestDb, TEST_DB_NAME } from './createTestDb';
import { MockAuthGuard } from './MockAuthGuard';
import { AppModule } from '../../src/app.module';
import { INestApplication } from '@nestjs/common';
import { EnvService } from '~/env';
import { MockEnvService } from './MockEnvService';
import { setupApp } from '../../src/setupApp';

const setupTestDatabase = async () => {
  if (!globalThis.__MONGOD__) {
    globalThis.__MONGOD__ = await createTestDb();
  }
  return globalThis.__MONGOD__;
};
export const setupTestApp = async (): Promise<INestApplication | null> => {
  await setupTestDatabase();
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
    .useClass(MockAuthGuard)
    .overrideProvider(EnvService)
    .useClass(MockEnvService)
    .compile();

  const app = testingModule.createNestApplication();
  setupApp(app);

  await app.init();

  try {
    await app.listen(4000);
  } catch (e) {
    //
    return null;
  }

  return app;
};
