import { ObjectId } from 'mongodb';

import { Repository } from '../../utils';

import { Product } from '../products/product';
import { Menu } from '../menus/menu';

const list = async (
  repository: Repository<Product>
): Promise<Product[]> => {
  return repository.aggregate([

  ]);
};

const create = async (
  repository: Repository<Menu | Product>,
  id: ObjectId,
  multiplier: number
): Promise<number> => {
  return repository.updateOne(id, { $set: { offer: multiplier } });
};

export default { list, create };
