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
import { env } from './env/env.schema';
import { MarketDataSocketModule } from './market-data-socket/market-data-socket.module';

@Module({
  imports: [
    AuthModule,
    MongooseModule.forRoot(env.ATLAS_CLUSTER_URI),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile:
        env.NODE_ENV === 'development'
          ? join(process.cwd(), '../../packages/schema/schema.gql')
          : true,
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
      playground: false,
      introspection: true,
      resolvers: { ObjectId: ObjectIdScalar },
      sortSchema: true,
      subscriptions: {
        'graphql-ws': {
          onConnect: (params) => {
            console.log(params);
            throw Error('graphql-ws not implemented on server yet');
          },
        },
        'subscriptions-transport-ws': {
          onConnect: (params: any) => {
            return {
              req: {
                headers: {
                  ...params,
                },
              },
            };
          },
        },
      },
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
    MarketDataSocketModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useExisting: JwtAuthGuard,
    },
    JwtAuthGuard,
  ],
})
export class AppModule {}
