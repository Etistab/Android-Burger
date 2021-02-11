import * as yup from 'yup';

import { isObjectId } from '../../utils';

import { Order } from './order';

/**
 * Validation Schema for new Order instances.
 */
const newSchema = yup.object().shape<Order>(
  {
    products: yup.array().of(
      yup.mixed().test(isObjectId)
    ).ensure(),
    menus: yup.array().of(
      yup.object().shape(
        {
          menu: yup.mixed().test(isObjectId).required(),
          products: yup.array().of(
            yup.object().shape(
              {
                product: yup.mixed().test(isObjectId).required(),
                category: yup.mixed().test(isObjectId).required()
              }
            )
          ).ensure()
        }
      )
    ).ensure()
  }
).test(
  'no-empty-order',
  'Empty order',
  (value: Order) => value.menus.length > 0 || value.products.length > 0
);

export default { newSchema };
