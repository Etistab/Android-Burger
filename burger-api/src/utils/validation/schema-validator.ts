import createHttpError from 'http-errors';
import * as yup from 'yup';

/**
 * Validates a given instance against the passed schema.
 * @param schema the schema to validate the instance.
 * @param instance the instance to validate against the schema.
 * @returns the instance if it is valid.
 * @throws a 422 Http Error if the instance is invalid.
 */
export const validateSchema = <T> (schema: yup.Schema<T>, instance: T): T => {
  try {
    return schema.validateSync(instance, { stripUnknown: true });
  } catch(error) {
    throw createHttpError(422, error.message);
  }
};
