import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setupApp } from './setupApp';

declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  setupApp(app);
  await app.listen(4000);

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }

  console.log('App listening on http://localhost:4000/graphql');
}
bootstrap();
