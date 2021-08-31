/**
 * @file graphql-compose/uitl
 * @description This file is used to provide re-usable functions for grpahql-compose
 */
import { BaggersMongoose } from '@baggers/mongoose';
import { AuthenticationError } from 'apollo-server-errors';
import { ApolloError } from 'apollo-server-lambda';
import { schemaComposer } from 'graphql-compose';
import { composeMongoose } from 'graphql-compose-mongoose';

export const initSchemaComposer = () => {
  Object.values(BaggersMongoose.models).forEach((model) => {
    if (model) {
      composeMongoose(model as any);
    }
  });
};

/**
 * Retrieve a composed TC from the schema constructor
 *
 * @param modelKey model name for the TC you wish to retrieve
 */
export const getTypeComposer = (
  modelKey: keyof typeof BaggersMongoose.models,
) => {
  return schemaComposer.getOTC(modelKey) as ReturnType<typeof composeMongoose>;
};

export const requireAuthenticatedResourceOwner = (next: any) => (rp: any) => {
  if (!rp.args.filter) {
    rp.args.filter = {};
  }
  if (!rp.context.identity) {
    throw new ApolloError(`User is not authenticated`, `UNAUTHENTICATED`);
  }
  rp.args.filter.owner = rp.context.identity.sub;
  return next(rp);
};

export const recordRequestOwner = (next: any) => (rp: any) => {
  console.log(rp.context);

  rp.args.record.owner = rp.context.identity.sub;
  return next(rp);
};

export const onlyOwnerCanMutate = (next: any) => async (rp: any) => {
  rp.beforeRecordMutate = async (doc: any, rp: any) => {
    if (doc.owner !== rp.context.identity.sub) {
      throw new Error(
        `You do not own this resource, you are unable to modify it`,
      );
    }
    return doc;
  };
  return next(rp);
};
export const requireAdmin = (next: any) => (rp: any) => {
  if (!rp.context.identity[`cognito:groups`]?.includes(`admin`)) {
    throw new AuthenticationError(
      `You must be an admin to access this resource`,
    );
  }
  return next(rp);
};
