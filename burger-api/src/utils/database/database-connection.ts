import { MongoClient, Db } from 'mongodb';

import { CONFIG } from '../../config';

/**
 * Attempts to establish a connection with the Mongo database.
 * @returns a database object if the connection is established.
 */
export const databaseConnection = async (): Promise<Db> => {
  const client = await MongoClient.connect(CONFIG.database.url,
    { useNewUrlParser: true, useUnifiedTopology: true }
  );
  return client.db(CONFIG.database.dbName);
};
