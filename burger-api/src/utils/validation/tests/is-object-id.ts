import { ObjectId } from 'mongodb';

/**
 * Yup test validating that the target instance is a Mongo ObjectId.
 */
export const isObjectId = {
  name: 'is-object-id',
  test: (value: any) => ObjectId.isValid(value),
  message: 'value must be valid object id'
};
