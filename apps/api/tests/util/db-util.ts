import { MongooseModule } from '@nestjs/mongoose';
import { Test } from '@nestjs/testing';
import WS from 'jest-websocket-mock';
import { createTestDb, TEST_DB_NAME } from './createTestDb';
import { MockAuthGuard } from './MockAuthGuard';
import { AppModule } from '../../src/app.module';
import { INestApplication } from '@nestjs/common';
import { setupApp } from '../../src/setupApp';
import { JwtAuthGuard } from '~/auth';
import tk from 'timekeeper';
const setupTestDatabase = async () => {
  if (!globalThis.__MONGOD__) {
    globalThis.__MONGOD__ = await createTestDb();
  }
  return globalThis.__MONGOD__;
};
export const setupTestApp = async (): Promise<INestApplication> => {
  await setupTestDatabase();

  const testingModule: any = await Test.createTestingModule({
    imports: [
      globalThis.__MONGOD__
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

  tk.freeze(new Date('2022/01/17'));
  setupApp(app);

  await app.init();

  globalThis.__APP__ = app;
  globalThis.__PORT__ = Math.floor(Math.random() * 5000 + 4000);
  try {
    await app.listen(globalThis.__PORT__);
  } catch (e) {
    //
  }

  return app;
};
