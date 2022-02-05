import { GraphQLSchema, printSchema } from 'graphql';
import { writeFileSync } from 'fs';
import { join } from 'path';
/**
 * This is a dev only file - that will produce a schema.json in development mode
 */

export const writeSchemaFile = async (schema: GraphQLSchema) => {
  const formattedSchema = printSchema(schema);

  const out = join(__dirname, `../../`, `schema.gql`);
  writeFileSync(out, formattedSchema);
};
