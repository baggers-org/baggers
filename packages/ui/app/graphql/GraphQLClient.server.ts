import { GraphQLClient } from "graphql-request";

const uri =process.env.GRAPHQL_ENDPOINT;

if (!uri) throw new Error('GRAPHQL_ENDPOINT not set');

export const client = new GraphQLClient(uri)