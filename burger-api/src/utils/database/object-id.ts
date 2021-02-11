import { ObjectId } from 'mongodb';

/**
 * Attempts to convert a string into an ObjectId instance.
 * @param id the string to convert.
 * @return an ObjectID instance or an empty string if the conversion fails.
 */
export const objectId = (id: string | ObjectId) => {
  try {
    return new ObjectId(id);
  } catch({}) {
    return '';
  }
};

/**
 * Checks if 2 ObjectIds have the same value.
 * @param id1 the first objectId.
 * @param id2 the second objectId.
 * @returns true if they are equal, false otherwise.
 */
export const areObjectIdsEqual = (id1?: ObjectId, id2?: ObjectId) => {
  try {
    return objectId(id1 ?? '').toString() === objectId(id2 ?? '').toString();
  } catch({}) {
    return false;
  }
};
