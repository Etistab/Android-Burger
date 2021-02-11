import { ObjectId } from 'mongodb';

import { Repository } from '../../utils';

import { Order } from './order';


/**
 * Retrieves the list of orders from the order collection that are pending.
 * @param repository the repository that interfaces the order collection.
 * @returns a list of pending orders.
 */
const listPending = async (
  repository: Repository<Order>
): Promise<Order[]> => {
  return repository.find({ fulfilled: { $ne: true } }, { orderNumber: 1, price: 1 });
};

/**
 * Retrieves the list of orders from the order collection that are completed.
 * @param repository the repository that interfaces the order collection.
 * @returns a list of completed orders.
 */
const listCompleted = async (
  repository: Repository<Order>
): Promise<Order[]> => {
  return repository.find({ fulfilled: { $eq: true } }, { orderNumber: 1, price: 1 });
};

/**
 * Retrieves one order from the order collection.
 * @param repository the repository that interfaces the order collection.
 * @param id the id of the order to look for.
 * @returns the order that matches the given id or null if it is not found.
 */
const findOne = async (
  repository: Repository<Order>,
  id: ObjectId
): Promise<Order | null> => {
  return repository.findById(id);
};

/**
 * Inserts a new Order in the order collection.
 * @param repository the repository that interfaces the order collection.
 * @param order the order to insert.
 * @returns the ObjectId of the newly inserted order.
 */
const create = async (
  repository: Repository<Order>,
  order: Order
): Promise<{ id: ObjectId }> => {
  return repository.insertOne(order);
};

/**
 * Removes an order from the order collection.
 * @param repository the repository that interfaces the order collection.
 * @param id the id of the order to remove.
 * @returns the amount of deleted documents.
 */
const remove = async (
  repository: Repository<Order>,
  id: ObjectId
): Promise<number> => {
  return repository.deleteOne(id);
};

/**
 * Completes an order and flags it as fulfilled.
 * @param repository the repository that interfaces the order collection.
 * @param id the id of the order to complete.
 * @returns the amount of updated documents.
 */
const complete = async (
  repository: Repository<Order>,
  id: ObjectId
): Promise<number> => {
  return repository.updateOne(id, { $set: { fulfilled: true } });
};

export default { listPending, listCompleted, findOne, create, remove, complete };
