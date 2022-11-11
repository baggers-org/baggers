import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { PortfolioImportModule } from '@api/portfolio-import';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { MongooseModule } from '@nestjs/mongoose';
import { join } from 'path';
import { APP_GUARD } from '@nestjs/core';
import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core';
import { SecuritiesModule } from '@api/securities';
import { ObjectIdScalar } from '@api/shared';
import { PortfoliosModule } from '@api/portfolios';
import { UsersModule } from '@api/users';
import { AuthModule, JwtAuthGuard } from '@api/auth';
import { EnvironmentSchema, EnvModule } from '@api/env';
import { PlaidItemsModule } from '@api/plaid-items';
import { PlaidLinkModule } from '@api/plaid-link';
import { OpenFigiModule } from './open-figi/open-figi.module';
import { ChartsModule } from './charts/charts.module';
import { PolygonService } from './polygon/polygon.service';
import { PolygonModule } from './polygon/polygon.module';

@Module({
  imports: [
    AuthModule,
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema:
        process.env.NODE_ENV !== 'test'
          ? EnvironmentSchema
          : undefined,
      validationOptions: {
        allowUnknowns: false,
      },
    }),
    MongooseModule.forRoot(process.env.ATLAS_CLUSTER_URI),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'schema.gql'),
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
      playground: false,
      introspection: true,
      resolvers: { ObjectId: ObjectIdScalar },
      sortSchema: true,
    }),
    UsersModule,
    ConfigModule,
    EnvModule,
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
