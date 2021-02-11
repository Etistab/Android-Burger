import { Db, ObjectId } from 'mongodb';
import { Request } from 'express';
import createHttpError from 'http-errors';

import { validateSchema, validateRouteParams, Repository, useRepository, objectId } from '../../utils';

import { Menu } from './menu';
import { Category } from '../categories/category';
import menuService from './menus.service';
import categoryService from '../categories/categories.service';
import menuSchema from './menus.schema';

/**
 * Returns the repository associated with the menu collection.
 * @returns the menu repository.
 */
const menuRepository = (database: Db): Repository<Menu> => useRepository(database, 'menu');

/**
 * Returns the repository associated with the category collection.
 * @returns the category repository.
 */
const categoryRepository = (database: Db): Repository<Category> => useRepository(database, 'category');

/**
 * Retrieves the list of menus from the database.
 * @param database the database in which to look for menus.
 * @returns a list of menus.
 */
const list = async (database: Db): Promise<Menu[]> => {
  return menuService.list(menuRepository(database));
};

/**
 * Retrieves one menu from the database.
 * @param database the database in which to find the menu.
 * @param request the Express request object.
 * @returns one menu matching the given id.
 * @throws a 404 http error if the id is invalid.
 */
const findOne = async (database: Db, request: Request): Promise<Menu> => {
  const [ id ] = validateRouteParams(request.params.id);

  const menu = await menuService.findOne(menuRepository(database), id);

  if (!menu) {
    throw createHttpError(404, 'Invalid menu id');
  }

  return menu;
};

/**
 * Attempts to insert a menu into the database.
 * @param database the database in which to insert the menu.
 * @param request the Express request object.
 * @returns and object containing the id of the newly inserted menu.
 */
const create = async (database: Db, request: Request): Promise<{ id: ObjectId }> => {
  const menu = validateSchema(menuSchema.newSchema, request.body as Menu);
  return menuService.create(menuRepository(database), menu);
};

/**
 * Attempts to update a menu in the database.
 * @param database the database in which to update the menu.
 * @param request the Express request object.
 * @returns the number of matched menus by the update query.
 */
const update = async (database: Db, request: Request): Promise<number> => {
  const [ id ] = validateRouteParams(request.params.id);
  const menu = validateSchema(menuSchema.updateSchema, request.body as Menu);
  return menuService.update(menuRepository(database), id, menu);
};

/**
 * Attempts to remove a menu from the database.
 * @param database the database in which to remove the menu.
 * @param request the Express request object.
 * @returns the number of deleted menus.
 */
const remove = async (database: Db, request: Request): Promise<number> => {
  const [ id ] = validateRouteParams(request.params.id);
  return menuService.remove(menuRepository(database), id);
};

/**
 * Attempts to add categories to a menu.
 * @param database the database in which to execute the action.
 * @param request the Express request object.
 * @returns the number of matched menus by the update query.
 * @throws a 404 http error if a category id is invalid.
 */
const addCategories = async (database: Db, request: Request): Promise<number> => {
  const [ id ] = validateRouteParams(request.params.id);

  const categoryIdList = validateSchema(
    menuSchema.categoryIdListSchema,
    request.body as {  categories: ObjectId[] }
  )
  .categories
  .map(categoryId => objectId(categoryId) as ObjectId);

  if (!await categoryService.exists(categoryRepository(database), ...categoryIdList)) {
    throw createHttpError(404, 'Invalid category id');
  }

  return menuService.addCategories(menuRepository(database), id, ...categoryIdList);
};

/**
 * Attempts to remove a category from a menu.
 * @param database the database in which to execute the action.
 * @param request the Express request object.
 * @returns the number of matched categories by the update query.
 */
const removeCategory = async (database: Db, request: Request): Promise<number> => {
  const [ id, categoryId ] = validateRouteParams(request.params.id, request.params.categoryId);

  return menuService.removeCategory(menuRepository(database), id, categoryId);
};

export default { list, create, update, remove, addCategories, removeCategory, findOne };
