import { INestApplication } from '@nestjs/common';
import { DocumentNode } from 'graphql';
import request from 'supertest-graphql';
export const appRequest = (app?: INestApplication) =>
  request<any>(app ? app.getHttpServer() : globalThis.__APP__.getHttpServer());

export const appQuery = (
  query: string | DocumentNode,
  app?: INestApplication,
) => appRequest(app).query(query);

export const appMutate = (
  mutation: string | DocumentNode,
  app?: INestApplication,
) => appRequest(app).mutate(mutation);
