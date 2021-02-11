import * as yup from 'yup';
import { ObjectId } from 'mongodb';

import { notEmptyObject, isObjectId } from '../../utils';

import { Menu } from './menu';

/**
 * Validation Schema for new Menu instances.
 */
const newSchema = yup.object().shape<Menu>(
  {
    name: yup.string().required(),
    image: yup.string().url().required(),
    description: yup.string().required(),
    price: yup.number().required()
  }
);

/**
 * Validation Schema to update Menu instances.
 */
const updateSchema = yup.object().shape<Partial<Menu>>(
  {
    name: yup.string(),
    image: yup.string().url(),
    description: yup.string(),
    price: yup.number()
  }
).test(notEmptyObject);

/**
 * Validation Schema to add categories to Menu instances.
 */
const categoryIdListSchema = yup.object().shape(
  {
    categories: yup.array().of<ObjectId>(
      yup.mixed().test(isObjectId)
    ).min(1).required()
  }
);

export default { newSchema, updateSchema, categoryIdListSchema };
