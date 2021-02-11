import { ObjectId } from 'mongodb';

import { Repository, areObjectIdsEqual } from '../../utils';

import { Menu } from './menu';

/**
 * Retrieves the list of menus from the menu collection.
 * @param repository the repository that interfaces the menu collection.
 * @returns a list of categories.
 */
const list = async (
  repository: Repository<Menu>
): Promise<Menu[]> => {
  return repository.aggregate([
    {
      $lookup: {
        from: 'category',
        let: { categories: '$categories' },
        pipeline: [
          {
            $match: {
              $expr: {
                $in: [ '$_id', '$$categories' ]
              }
            }
          },
          {
            $lookup: {
              from: 'product',
              localField: 'products',
              foreignField: '_id',
              as: 'products'
            }
          }
        ],
        as: 'categories'
      }
    }
  ]);
};

/**
 * Retrieves one menu from the menu collection.
 * @param repository the repository that interfaces the menu collection.
 * @param id the id of the menu to look for.
 * @returns the menu that matches the given id or null if it is not found.
 */
const findOne = async (
  repository: Repository<Menu>,
  id: ObjectId
): Promise<Menu | null> => {
  return repository.aggregate([
    { $match: { $expr: { $eq: [ id, '$_id' ] } } },
    {
      $lookup: {
        from: 'category',
        let: { categories: '$categories' },
        pipeline: [
          {
            $match: {
              $expr: {
                $in: [ '$_id', '$$categories' ]
              }
            }
          },
          {
            $lookup: {
              from: 'product',
              localField: 'products',
              foreignField: '_id',
              as: 'products'
            }
          }
        ],
        as: 'categories'
      }
    }
  ]).then(res => res[0]);
};

/**
 * Retrieves one menu's price from the menu collection.
 * @param repository the repository that interfaces the menu collection.
 * @param id the id of the menu to look for.
 * @returns the price of the menu or 0 if no menu is found for the given id.
 */
const findPrice = async (
  repository: Repository<Menu>,
  id: ObjectId
): Promise<number> => {
  const menu: Menu = await repository.findById(id);

  if (!menu) {
    return 0;
  }

  return menu.price * (menu.offer ?? 1);
};

/**
 * Checks menus existence in the menu collection.
 * @param repository the repository that interfaces the menu collection.
 * @param id the ids of the menus to look for.
 * @returns false if any of the menus does not exist, true otherwise.
 */
const exists = async (
  repository: Repository<Menu>,
  ...ids: ObjectId[]
): Promise<boolean> => {
  return repository.exists(...ids);
};

/**
 * Inserts a new Menu in the menu collection.
 * @param repository the repository that interfaces the menu collection.
 * @param menu the menu to insert.
 * @returns the ObjectId of the newly inserted menu.
 */
const create = async (
  repository: Repository<Menu>,
  menu: Menu
): Promise<{ id: ObjectId }> => {
  return repository.insertOne({ ...menu, categories: [] });
};

/**
 * Updates a menu in the menu collection.
 * @param repository the repository that interfaces the menu collection.
 * @param id the id of the menu to update.
 * @param menu the new body of the menu.
 * @returns the amount of documents matched by the given id in the menu collection.
 */
const update = async (
  repository: Repository<Menu>,
  id: ObjectId,
  menu: Partial<Menu>
): Promise<number> => {
  return repository.updateOne(id, { $set: menu });
};

/**
 * Removes a menu from the menu collection.
 * @param repository the repository that interfaces the menu collection.
 * @param id the id of the menu to remove.
 * @returns the amount of deleted documents.
 */
const remove = async (
  repository: Repository<Menu>,
  id: ObjectId
): Promise<number> => {
  return repository.deleteOne(id);
};

/**
 * Adds a list of category to a menu.
 * @param repository the repository that interfaces the menu collection.
 * @param id the id of the menu.
 * @param categoryIds the ids of the categories to add.
 * @returns the amount of documents matched by the given id in the menu collection.
 */
const addCategories = async (
  repository: Repository<Menu>,
  id: ObjectId,
  ...categoryIds: ObjectId[]
): Promise<number> => {
  return repository.updateOne(id, { $addToSet: { categories: { $each: categoryIds } } });
};

/**
 * Removes a category from a menu.
 * @param repository the repository that interfaces the menu collection.
 * @param id the id of the menu.
 * @param categoryId the id of the category to remove.
 * @returns the amount of documents matched by the given id in the menu collection.
 */
const removeCategory = async (
  repository: Repository<Menu>,
  id: ObjectId,
  categoryId: ObjectId
): Promise<number> => {
  return repository.updateOne(id, { $pull: { categories: categoryId } });
};

/**
 * Checks if menu contains given categories.
 * @param repository the repository that interfaces the menu collection.
 * @param id the id of the menu.
 * @param categoryIds the ids of the categories to look for in the menu.
 * @returns true if all the categories are contained in the menu, false otherwise.
 */
const containCategories = async (
  repository: Repository<Menu>,
  id: ObjectId,
  ...categoryIds: ObjectId[]
): Promise<boolean> => {
  const menu: Menu = await repository.findById(id);

  if (!menu) {
    return false;
  }

  const menuCategories = menu.categories ?? [];
  categoryIds.sort((a, b) => a.toString().localeCompare(b.toString()));
  menuCategories.sort((a, b) => a.toString().localeCompare(b.toString()));

  return categoryIds.every((categoryId, index) => areObjectIdsEqual(menuCategories[index], categoryId));
};

export default {
  list,
  create,
  update,
  remove,
  addCategories,
  removeCategory,
  findOne,
  exists,
  containCategories,
  findPrice
};
