import { GraphQLClient } from 'graphql-request';

const { API_URI } = process.env;

if (!API_URI) throw new Error(`API_URI not set`);

export const client = new GraphQLClient(`${API_URI}/graphql`);
