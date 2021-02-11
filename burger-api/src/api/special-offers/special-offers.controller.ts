import { Request } from 'express';
import { Db } from 'mongodb';

import { Repository, useRepository, validateRouteParams, validateSchema } from '../../utils';

import { Menu } from '../menus/menu';
import { Product } from '../products/product';
import specialOfferSchema from './special-offers.schema';
import specialOfferService from './special-offers.service';


const productRepository = (database: Db): Repository<Product> => useRepository(database, 'product');

const menuRepository = (database: Db): Repository<Menu> => useRepository(database, 'menu');

const list = async (database: Db): Promise<Product[]> => {
  return specialOfferService.list(productRepository(database));
};

const createProductOffer = async (database: Db, request: Request): Promise<number> => {
  const [ id ] = validateRouteParams(request.params.id);
  const { multiplier } = validateSchema(specialOfferSchema.newSchema, request.body);
  return specialOfferService.create(productRepository(database), id, multiplier);
};

const createMenuOffer = async (database: Db, request: Request): Promise<number> => {
  const [ id ] = validateRouteParams(request.params.id);
  const { multiplier } = validateSchema(specialOfferSchema.newSchema, request.body);
  return specialOfferService.create(menuRepository(database), id, multiplier);
};

export default { list, createProductOffer, createMenuOffer };
