import { ObjectId } from 'mongodb';

/**
 * Represents a customer's order.
 */
export interface Order {
  _id?: ObjectId;
  orderNumber?: string;
  price?: number;
  products: ObjectId[];
  menus: {
    menu: ObjectId;
    products: {
      product: ObjectId;
      category: ObjectId;
    }[];
  }[];
  fulfilled?: boolean;
}

/**
 * Generates a random order number.
 * @returns a random order number.
 */
export const getRandomOrderNumber = (): string => {
  const getRandomInteger = (max: number): number => {
    return Math.floor(Math.random() * Math.floor(max));
  };

  const getRandomLetter = (): string => {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    return letters[getRandomInteger(letters.length - 1)];
  };

  return getRandomLetter() + getRandomLetter() + getRandomInteger(999);
};
