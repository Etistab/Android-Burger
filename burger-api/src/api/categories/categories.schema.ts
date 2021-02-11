import * as yup from 'yup';
import { ObjectId } from 'mongodb';

import { notEmptyObject, isObjectId } from '../../utils';

import { Category } from './category';

/**
 * Validation Schema for new Category instances.
 */
const newSchema = yup.object().shape<Category>(
  {
    name: yup.string().required(),
    image: yup.string().url().required(),
    description: yup.string().required()
  }
);

/**
 * Validation Schema to update Category instances.
 */
const updateSchema = yup.object().shape<Partial<Category>>(
  {
    name: yup.string(),
    image: yup.string().url(),
    description: yup.string()
  }
).test(notEmptyObject);

/**
 * Validation Schema to add product to Category instances.
 */
const productIdListSchema = yup.object().shape(
  {
    products: yup.array().of<ObjectId>(
      yup.mixed().test(isObjectId)
    ).min(1).required()
  }
);

export default { newSchema, updateSchema, productIdListSchema };
