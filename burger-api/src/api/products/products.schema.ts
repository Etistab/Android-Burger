import * as yup from 'yup';

import { notEmptyObject } from '../../utils';

import { Product } from './product';

/**
 * Validation Schema for new Product instances.
 */
const newSchema = yup.object().shape<Product>(
  {
    name: yup.string().required(),
    price: yup.number().min(0).required(),
    image: yup.string().url().required(),
    description: yup.string().required(),
    calories: yup.number().min(0).required()
  }
);

/**
 * Validation Schema to update Product instances.
 */
const updateSchema = yup.object().shape<Product>(
  {
    name: yup.string(),
    price: yup.number().min(0),
    image: yup.string().url(),
    description: yup.string(),
    calories: yup.number().min(0)
  }
).test(notEmptyObject);

export default { newSchema, updateSchema };
