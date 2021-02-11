import { Collection, ObjectId } from 'mongodb';

import { objectId } from './object-id';

/**
 * A simple repository simplifying calls to underlying MongoDB driver.
 */
export class Repository<T> {

  /**
   * The underlying Mongo collection.
   */
  collection: Collection<any>;

  /**
   * Creates a new Repository instance to be used in a service.
   * @param collection the collection on which the repository should operate.
   */
  constructor(collection: Collection<T>) {
    this.collection = collection;
  }

  /**
   * Fetches elements in the collection.
   * @param filter you may specify a filter to match only specific elements in the collection.
   * @param projection you may specifiy a projection to return only specific fields of the matched documents.
   * @returns an array of the collection elements.
   */
  async find(filter: any, projection: any) {
    return this.collection.find(filter, { projection }).toArray();
  }

  /**
   * Fetches all elements in the collection.
   * @returns an array of the collection elements.
   */
  async findAll(): Promise<any[]> {
    return this.collection.find().toArray();
  }

  /**
   * Fetches the element of the passed id in the collection.
   * @param id the id of the element to look for.
   * @returns an element or null if it is not found.
   */
  async findById(id: ObjectId): Promise<any> {
    return this.collection.findOne({ _id: id });
  }

  /**
   * Inserts one element in the collection.
   * @param entity the element to insert.
   * @returns an object containing the id of the inserted element.
   */
  async insertOne(entity: any): Promise<{ id: ObjectId }> {
    return this.collection.insertOne(entity).then(res => ({ id: res.insertedId }));
  }

  /**
   * Updates one element in the collection.
   * @param id the id of the element to update.
   * @param update the update query to apply to the desired element.
   * @returns the number of document found for the given id in the collection.
   */
  async updateOne(id: ObjectId, update: any): Promise<number> {
    return this.collection.updateOne({ _id: id }, update).then(res => res.matchedCount);
  }

  /**
   * Deletes one element in the collection.
   * @param id the id of the element to delete.
   * @returns the number of deleted elements.
   */
  async deleteOne(id: ObjectId): Promise<number> {
    return this.collection.deleteOne({ _id: id }).then(res => res.deletedCount ?? 0);
  }

  /**
   * Checks ids existence against a collection.
   * @param ids a list of objectIds or their string representation.
   * @returns true if all ids exist, or false if at least one of them doesn't.
   */
  async exists(...ids: (ObjectId | string)[]): Promise<boolean> {
    const objectIds = ids.map(id => objectId(id) as ObjectId);

    const result = await Promise.all(
      objectIds.map(
        async (id) => this.findById(id)
      )
    );

    return !result.some(r => !r);
  }

  /**
   * A powerful aggregation pipeline for more advanced cases.
   * @param pipeline a list of MongoDB operations.
   * @returns the result of the pipeline operations.
   */
  async aggregate(pipeline: object[]): Promise<any[]> {
    return this.collection.aggregate(pipeline).toArray();
  }

}
