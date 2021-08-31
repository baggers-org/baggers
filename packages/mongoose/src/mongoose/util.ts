import {
  Connection,
  LeanDocument,
  Model,
  Schema,
  SchemaDefinition,
  _AllowStringsForIds,
} from "mongoose";

export type SchemaDef<ISchemaType> = SchemaDefinition<
  _AllowStringsForIds<LeanDocument<ISchemaType>>
>;
export type BaggersMongooseCollection<ICollectionType> = {
  name: string;
  schemaDefinition: SchemaDef<ICollectionType>;
  schema: Schema<ICollectionType>;
  // Populated after db connection
  model?: Model<ICollectionType>;
  initModel: (connection: Connection) => Model<ICollectionType>;
};

export function defineCollection<ICollectionType>(options: {
  name: string;
  schemaDefinition: SchemaDef<ICollectionType>;
}): BaggersMongooseCollection<ICollectionType> {
  const schema: Schema<ICollectionType> = new Schema(options.schemaDefinition);
  return {
    name: options.name,
    schemaDefinition: options.schemaDefinition,
    schema,
    initModel: (connection) => {
      return connection.model<ICollectionType>(options.name, schema);
    },
  };
}
