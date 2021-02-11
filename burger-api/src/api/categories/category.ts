import { ObjectId } from 'mongodb';

/**
 * Represents a Category: a simple selection of products.
 */
export interface Category {
  _id?: ObjectId;
  name: string;
  image: string;
  description: string;
  products?: ObjectId[];
}
