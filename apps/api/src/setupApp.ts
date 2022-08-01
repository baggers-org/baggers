import { INestApplication } from '@nestjs/common';

// TODO: investigate why class-validator breaks my mongodb integration
export const setupApp = (app: INestApplication) => {
  return app;
};
