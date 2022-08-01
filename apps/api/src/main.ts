import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setupApp } from './setupApp';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  setupApp(app);
  await app.listen(4000);

  console.log('App listening on http://localhost:4000/graphql');
}
bootstrap();
