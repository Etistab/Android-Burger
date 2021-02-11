import { ObjectId } from 'mongodb';

import { Repository, areObjectIdsEqual } from '../../utils';

import { Category } from './category';

/**
 * Retrieves the list of categories from the category collection.
 * @param repository the repository that interfaces the category collection.
 * @returns a list of categories.
 */
const list = async (
  repository: Repository<Category>
): Promise<Category[]> => {
  return repository.aggregate([
    {
      $lookup: {
        from: 'product',
        localField: 'products',
        foreignField: '_id',
        as: 'products'
      }
    }
  ]);
};

/**
 * Retrieves one category from the category collection.
 * @param repository the repository that interfaces the category collection.
 * @param id the id of the category to look for.
 * @returns the category that matches the given id or null if it is not found.
 */
const findOne = async (
  repository: Repository<Category>,
  id: ObjectId
): Promise<Category | null> => {
  return repository.aggregate([
    { $match: { $expr: { $eq: [ id, '$_id' ] } } },
    {
      $lookup: {
        from: 'product',
        localField: 'products',
        foreignField: '_id',
        as: 'products'
      }
    }
  ]).then(res => res[0]);
};

/**
 * Checks categories existence in the category collection.
 * @param repository the repository that interfaces the category collection.
 * @param id the ids of the categories to look for.
 * @returns false if any of the categories does not exist, true otherwise.
 */
const exists = async (
  repository: Repository<Category>,
  ...ids: ObjectId[]
): Promise<boolean> => {
  return repository.exists(...ids);
};

/**
 * Inserts a new Category in the category collection.
 * @param repository the repository that interfaces the category collection.
 * @param category the category to insert.
 * @returns the ObjectId of the newly inserted category.
 */
const create = async (
  repository: Repository<Category>,
  category: Category
): Promise<{ id: ObjectId }> => {
  return repository.insertOne({ ...category, products: [] });
};

/**
 * Updates a category in the category collection.
 * @param repository the repository that interfaces the category collection.
 * @param id the id of the category to update.
 * @param category the new body of the category.
 * @returns the amount of documents matched by the given id in the category collection.
 */
const update = async (
  repository: Repository<Category>,
  id: ObjectId,
  category: Partial<Category>
): Promise<number> => {
  return repository.updateOne(id, { $set: category });
};

/**
 * Removes a category from the category collection.
 * @param repository the repository that interfaces the category collection.
 * @param id the id of the category to remove.
 * @returns the amount of deleted documents.
 */
const remove = async (
  repository: Repository<Category>,
  id: ObjectId
): Promise<number> => {
  return repository.deleteOne(id);
};

/**
 * Adds a list of product to a category.
 * @param repository the repository that interfaces the category collection.
 * @param id the id of the category.
 * @param productIds the ids of the products to add.
 * @returns the amount of documents matched by the given id in the category collection.
 */
const addProducts = async (
  repository: Repository<Category>,
  id: ObjectId,
  ...productIds: ObjectId[]
): Promise<number> => {
  return repository.updateOne(id, { $addToSet: { products: { $each: productIds } } });
};

/**
 * Removes a product from a category.
 * @param repository the repository that interfaces the category collection.
 * @param id the id of the category.
 * @param productId the id of the product to remove.
 * @returns the amount of documents matched by the given id in the category collection.
 */
const removeProduct = async (
  repository: Repository<Category>,
  id: ObjectId,
  productId: ObjectId
): Promise<number> => {
  return repository.updateOne(id, { $pull: { products: productId } });
};

/**
 * Checks if category contains given products.
 * @param repository the repository that interfaces the category collection.
 * @param id the id of the category.
 * @param productIds the ids of the products to look for in the category.
 * @returns true if all the products are contained in the category, false otherwise.
 */
const containProducts = async (
  repository: Repository<Category>,
  id: ObjectId,
  ...productIds: ObjectId[]
): Promise<boolean> => {
  const category: Category = await repository.findById(id);

  if (!category) {
    return false;
  }

  const categoryProducts = category.products ?? [];
  productIds.sort((a, b) => a.toString().localeCompare(b.toString()));
  categoryProducts.sort((a, b) => a.toString().localeCompare(b.toString()));

  return productIds.every((productId, index) => areObjectIdsEqual(categoryProducts[index], productId));
};

export default { list, create, update, remove, findOne, addProducts, removeProduct, exists, containProducts };
