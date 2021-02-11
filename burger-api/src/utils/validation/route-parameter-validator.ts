import createHttpError from 'http-errors';
import { ObjectId } from 'mongodb';

import { objectId } from '../database/object-id';

/**
 * Calls the validateRouteParam function on every passed param.
 * @param params the list of params.
 * @returns the list of correspondant ObjectId.
 */
export const validateRouteParams = (...params: string[]): ObjectId[] => {
  return params.map(validateRouteParam);
};

/**
 * Checks if the passed route parameter is a valid ObjectID.
 * @param param the string to validate.
 * @returns an ObjectID instance matching the valid string.
 * @throws a 422 Http Error if the string is invalid.
 */
const validateRouteParam = (param: string): ObjectId => {
  const id = objectId(param);
  if (!ObjectId.isValid(id)) {
    throw createHttpError(422, 'Invalid route parameter');
  }
  return id as ObjectId;
};
