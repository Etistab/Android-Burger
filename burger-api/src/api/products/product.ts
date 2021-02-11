import { ObjectId } from 'mongodb';

import { SpecialOffer } from '../special-offers/special-offer';

/**
 * Represents a simple product.
 */
export interface Product {
  _id?: ObjectId;
  name: string;
  price: number;
  image: string;
  description: string;
  calories: number;
  offer?: SpecialOffer;
}
