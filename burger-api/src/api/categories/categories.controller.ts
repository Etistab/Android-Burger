import { Db, ObjectId } from 'mongodb';
import { Request } from 'express';
import createHttpError from 'http-errors';

import { validateSchema, validateRouteParams, Repository, useRepository, objectId } from '../../utils';

import { Category } from './category';
import { Product } from '../products/product';
import categoryService from './categories.service';
import productService from '../products/products.service';
import categorySchema from './categories.schema';

/**
 * Returns the repository associated with the product collection.
 * @returns the product repository.
 */
const productRepository = (database: Db): Repository<Product> => useRepository(database, 'product');

/**
 * Returns the repository associated with the category collection.
 * @returns the category repository.
 */
const categoryRepository = (database: Db): Repository<Category> => useRepository(database, 'category');

/**
 * Retrieves the list of categories from the database.
 * @param database the database in which to look for categories.
 * @returns a list of categories.
 */
const list = async (database: Db): Promise<Category[]> => {
  return categoryService.list(categoryRepository(database));
};

/**
 * Retrieves one category from the database.
 * @param database the database in which to find the category.
 * @param request the Express request object.
 * @returns one category matching the given id.
 * @throws a 404 http error if the id is invalid.
 */
const findOne = async (database: Db, request: Request): Promise<Category> => {
  const [ id ] = validateRouteParams(request.params.id);

  const category = await categoryService.findOne(categoryRepository(database), id);

  if (!category) {
    throw createHttpError(404, 'Invalid category id');
  }

  return category;
};

/**
 * Attempts to insert a category into the database.
 * @param database the database in which to insert the category.
 * @param request the Express request object.
 * @returns and object containing the id of the newly inserted category.
 */
const create = async (database: Db, request: Request): Promise<{ id: ObjectId }> => {
  const category = validateSchema(categorySchema.newSchema, request.body as Category);
  return categoryService.create(categoryRepository(database), category);
};

/**
 * Attempts to update a category in the database.
 * @param database the database in which to update the category.
 * @param request the Express request object.
 * @returns the number of matched categories by the update query.
 */
const update = async (database: Db, request: Request): Promise<number> => {
  const [ id ] = validateRouteParams(request.params.id);
  const category = validateSchema(categorySchema.updateSchema, request.body as Category);
  return categoryService.update(categoryRepository(database), id, category);
};

/**
 * Attempts to remove a category from the database.
 * @param database the database in which to remove the category.
 * @param request the Express request object.
 * @returns the number of deleted categories.
 */
const remove = async (database: Db, request: Request): Promise<number> => {
  const [ id ] = validateRouteParams(request.params.id);
  return categoryService.remove(categoryRepository(database), id);
};

/**
 * Attempts to add products to a category.
 * @param database the database in which to execute the action.
 * @param request the Express request object.
 * @returns the number of matched categories by the update query.
 * @throws a 404 http error if a product id is invalid.
 */
const addProducts = async (database: Db, request: Request): Promise<number> => {
  const [ id ] = validateRouteParams(request.params.id);

  const productIdList = validateSchema(
    categorySchema.productIdListSchema,
    request.body as { products: ObjectId[] }
  )
  .products
  .map(productId => objectId(productId) as ObjectId);

  if (!await productService.exists(productRepository(database), ...productIdList)) {
    throw createHttpError(404, 'Invalid product id');
  }

  return categoryService.addProducts(categoryRepository(database), id, ...productIdList);
};

/**
 * Attempts to remove a product from a category.
 * @param database the database in which to execute the action.
 * @param request the Express request object.
 * @returns the number of matched categories by the update query.
 */
const removeProduct = async (database: Db, request: Request): Promise<number> => {
  const [ id, productId ] = validateRouteParams(request.params.id, request.params.productId);

  return categoryService.removeProduct(categoryRepository(database), id, productId);
};

export default { list, create, update, remove, addProducts, removeProduct, findOne };
