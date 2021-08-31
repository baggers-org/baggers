import * as collections from './collections';
import './indexes';
import mongoose, { Connection, Model } from 'mongoose';
import { IPortfolio, IPosition, IQuote, ISymbol } from './interfaces';

let conn: Connection;

export const models: Partial<{
  Portfolio: Model<IPortfolio>;
  Symbol: Model<ISymbol>;
  Quote: Model<IQuote>;
  Position: Model<IPosition>;
}> = {};

export const initSchema = async (connection: Connection) => {
  Object.values(collections).forEach((collection) => {
    models[collection.name as keyof typeof models] = collection.initModel(
      connection,
    ) as Model<any>;
  });
};

export const getDbConnection = async (clusterURI: string) => {
  if (!clusterURI) {
    throw new Error(`No Mongo URL in environment`);
  }

  // Re-use existing connection
  if (conn == null) {
    console.log(`Creating new DB connection`);

    conn = await mongoose.createConnection(clusterURI, {
      bufferCommands: false,
      bufferMaxEntries: 0,
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
    });
  }
  return conn;
};
