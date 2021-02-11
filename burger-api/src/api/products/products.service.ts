import { ObjectId } from 'mongodb';

import { Repository } from '../../utils';

import { Product } from './product';

/**
 * Retrieves the list of products from the product collection.
 * @param repository the repository that interfaces the product collection.
 * @returns a list of products.
 */
const list = async (
  repository: Repository<Product>
): Promise<Product[]> => {
  return repository.findAll();
};

/**
 * Retrieves one product from the product collection.
 * @param repository the repository that interfaces the product collection.
 * @param id the id of the product to look for.
 * @returns the product that matches the given id or null if it is not found.
 */
const findOne = async (
  repository: Repository<Product>,
  id: ObjectId
): Promise<Product | null> => {
  return repository.findById(id);
};

/**
 * Retrieves one product's price from the product collection.
 * @param repository the repository that interfaces the product collection.
 * @param id the id of the product to look for.
 * @returns the price of the product or 0 if no product is found for the given id.
 */
const findPrice = async (
  repository: Repository<Product>,
  id: ObjectId
): Promise<number> => {
  const product: Product = await repository.findById(id);

  if (!product) {
    return 0;
  }

  return product.price * (product.offer ?? 1);
};

/**
 * Checks products existence in the product collection.
 * @param repository the repository that interfaces the product collection.
 * @param id the ids of the products to look for.
 * @returns false if any of the products does not exist, true otherwise.
 */
const exists = async (
  repository: Repository<Product>,
  ...ids: ObjectId[]
): Promise<boolean> => {
  return repository.exists(...ids);
};

/**
 * Inserts a new Product in the product collection.
 * @param repository the repository that interfaces the product collection.
 * @param product the product to insert.
 * @returns the ObjectId of the newly inserted product.
 */
const create = async (
  repository: Repository<Product>,
  product: Product
): Promise<{ id: ObjectId }> => {
  return repository.insertOne(product);
};

/**
 * Updates a product in the product collection.
 * @param repository the repository that interfaces the product collection.
 * @param id the id of the product to update.
 * @param product the new body of the product.
 * @returns the amount of documents matched by the given id in the product collection.
 */
const update = async (
  repository: Repository<Product>,
  id: ObjectId,
  product: Partial<Product>
): Promise<number> => {
  return repository.updateOne(id, { $set: product });
};

/**
 * Removes a product from the product collection.
 * @param repository the repository that interfaces the product collection.
 * @param id the id of the product to remove.
 * @returns the amount of deleted documents.
 */
const remove = async (
  repository: Repository<Product>,
  id: ObjectId
): Promise<number> => {
  return repository.deleteOne(id);
};

export default { list, findOne, create, update, remove, exists, findPrice };
