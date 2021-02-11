import { Db } from 'mongodb';

import { Repository } from './repository';

/**
 * The repository map associating a collection name and its corresponding repository.
 */
const repositoryMap = new Map<string, Repository<any>>();

/**
 * Hook allowing to retrieve the repository associated with the given collection name.
 * @param database a handle to the Mongo database.
 * @param collectionName the name of a collection.
 * @returns the proper repository.
 */
export const useRepository = (database: Db, collectionName: string): Repository<any> => {
  let repository =  repositoryMap.get(collectionName);

  if (!repository) {
    repository = new Repository(database.collection(collectionName));
    repositoryMap.set(collectionName, repository);
  }

  return repository;
};
