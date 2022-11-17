import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { PortfolioImportModule } from '~/portfolio-import';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { MongooseModule } from '@nestjs/mongoose';
import { join } from 'path';
import { APP_GUARD } from '@nestjs/core';
import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core';
import { SecuritiesModule } from '~/securities';
import { ObjectIdScalar } from '~/shared';
import { PortfoliosModule } from '~/portfolios';
import { UsersModule } from '~/users';
import { AuthModule, JwtAuthGuard } from '~/auth';
import { PlaidItemsModule } from '~/plaid-items';
import { PlaidLinkModule } from '~/plaid-link';
import { OpenFigiModule } from './open-figi/open-figi.module';
import { ChartsModule } from './charts/charts.module';
import { PolygonService } from './polygon/polygon.service';
import { PolygonModule } from './polygon/polygon.module';
import { env } from './env/env.schema';

import { MongoMemoryServer } from 'mongodb-memory-server';

@Module({
  imports: [
    AuthModule,
    MongooseModule.forRootAsync({
      useFactory: async () => {
        const mongod = await MongoMemoryServer.create();

        const uri = mongod.getUri();
        console.log(uri);

        return {
          uri,
        };
      },
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile:
        env.NODE_ENV === 'development'
          ? join(process.cwd(), '../../packages/schema/schema.gql')
          : false,
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
      playground: false,
      introspection: true,
      resolvers: { ObjectId: ObjectIdScalar },
      sortSchema: true,
    }),
    UsersModule,
    ConfigModule,
    SecuritiesModule,
    PortfoliosModule,
    PortfolioImportModule,
    PlaidItemsModule,
    PlaidLinkModule,
    OpenFigiModule,
    ChartsModule,
    PolygonModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useExisting: JwtAuthGuard,
    },
    JwtAuthGuard,
    PolygonService,
  ],
})
export class AppModule {}
