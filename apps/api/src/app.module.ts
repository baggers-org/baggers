import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { MongooseModule } from '@nestjs/mongoose';
import { join } from 'path';
import { APP_GUARD } from '@nestjs/core';
import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core';
import { TickersModule } from '@baggers/api-tickers';
import { ObjectIdScalar } from '@baggers/api-shared';
import { PortfoliosModule } from '@baggers/api-portfolios';
import { UsersModule } from '@baggers/api-users';
import { AuthModule, JwtAuthGuard } from '@baggers/api-auth';
import { EnvironmentSchema, EnvModule } from '@baggers/api-env';

@Module({
  imports: [
    AuthModule,
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: EnvironmentSchema,
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
    TickersModule,
    PortfoliosModule,
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
