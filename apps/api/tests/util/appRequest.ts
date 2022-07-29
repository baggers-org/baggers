import { INestApplication } from '@nestjs/common';
import { DocumentNode } from 'graphql';
import request, { Variables } from 'supertest-graphql';

export const appRequest = <T, TVariables extends Variables = Variables>(
  app?: INestApplication
) =>
  request<T, TVariables>(
    app ? app.getHttpServer() : globalThis.__APP__.getHttpServer()
  );

export const appQuery = <T, TVariables extends Variables = Variables>(
  query: string | DocumentNode,
  app?: INestApplication
) => appRequest<T, TVariables>(app).query(query);

export const appMutate = <T, TVariables extends Variables = Variables>(
  mutation: string | DocumentNode,
  app?: INestApplication
) => appRequest<T, TVariables>(app).mutate(mutation);
