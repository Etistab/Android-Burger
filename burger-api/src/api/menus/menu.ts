import { ObjectId } from 'mongodb';
import { SpecialOffer } from '../special-offers/special-offer';

/**
 * Represents a Menu with a fixed price and a selection of categories to choose from.
 */
export interface Menu {
  _id?: ObjectId;
  name: string;
  price: number;
  image: string;
  description: string;
  categories?: ObjectId[];
  offer?: SpecialOffer;
}
