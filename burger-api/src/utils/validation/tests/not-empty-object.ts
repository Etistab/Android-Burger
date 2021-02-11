/**
 * Yup test validating that the target instance is not an empty object.
 */
export const notEmptyObject = {
  name: 'not-empty-object',
  test: (value: any) => JSON.stringify(value) !== '{}',
  message: 'object must contain at least one valid field'
};
