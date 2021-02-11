import { Db, ObjectId } from 'mongodb';
import { Request } from 'express';
import createHttpError from 'http-errors';

import { validateSchema, validateRouteParams, Repository, useRepository, objectId, areObjectIdsEqual } from '../../utils';

import { Order, getRandomOrderNumber } from './order';
import { Menu } from '../menus/menu';
import { Product } from '../products/product';
import { Category } from '../categories/category';
import orderService from './orders.service';
import productService from '../products/products.service';
import menuService from '../menus/menus.service';
import categoryService from '../categories/categories.service';
import orderSchema from './orders.schema';

/**
 * Returns the repository associated with the order collection.
 * @returns the order repository.
 */
const orderRepository = (database: Db): Repository<Order> => useRepository(database, 'order');

/**
 * Returns the repository associated with the product collection.
 * @returns the product repository.
 */
const productRepository = (database: Db): Repository<Product> => useRepository(database, 'product');

/**
 * Returns the repository associated with the category collection.
 * @returns the category repository.
 */
const categoryRepository = (database: Db): Repository<Category> => useRepository(database, 'category');

/**
 * Returns the repository associated with the menu collection.
 * @returns the menu repository.
 */
const menuRepository = (database: Db): Repository<Menu> => useRepository(database, 'menu');

/**
 * Retrieves the list of orders from the database that are completed.
 * @param database the database in which to look for orders.
 * @returns a list of completed orders.
 */
const listCompleted = async (database: Db): Promise<Order[]> => {
  return orderService.listCompleted(orderRepository(database));
};

/**
 * Retrieves the list of orders from the database that are pending.
 * @param database the database in which to look for orders.
 * @returns a list of pending orders.
 */
const listPending = async (database: Db): Promise<Order[]> => {
  return orderService.listPending(orderRepository(database));
};


/**
 * Retrieves one order from the database.
 * @param database the database in which to find the order.
 * @param request the Express request object.
 * @returns one order matching the given id.
 * @throws a 404 http error if the id is invalid.
 */
const findOne = async (database: Db, request: Request): Promise<Order> => {
  const [ id ] = validateRouteParams(request.params.id);

  const order = await orderService.findOne(orderRepository(database), id);

  if (!order) {
    throw createHttpError(404, 'Invalid order id');
  }

  return order;
};

/**
 * Attempts to insert an order into the database.
 * @param database the database in which to insert the order.
 * @param request the Express request object.
 * @returns an object containing the id of the newly inserted order.
 * @throws a 404 http error if an id is invalid.
 */
const create = async (database: Db, request: Request): Promise<{ id: ObjectId }> => {
  const order = validateSchema(orderSchema.newSchema, request.body as Order);

  const productIdList = order.products.map(id => objectId(id) as ObjectId);

  if (!await productService.exists(productRepository(database), ...productIdList)) {
    throw createHttpError(404, 'Invalid product id');
  }

  const menuIdList = order.menus.map(m => objectId(m.menu) as ObjectId);

  if (!await menuService.exists(menuRepository(database), ...menuIdList)) {
    throw createHttpError(404, 'Invalid menu id');
  }

  const menuCategories = order.menus
    .flatMap(m => ({
      menu: objectId(m.menu) as ObjectId,
      categories: m.products
        .map(p => objectId(p.category) as ObjectId)
    }));

  const menus = await Promise.all(
    menuCategories.map(
      async (m) => menuService.findOne(
        menuRepository(database),
        m.menu
      )
    )
  );

  if (menus.some(m => m?.categories?.length !== menuCategories.find(e => areObjectIdsEqual(m?._id, e.menu))?.categories.length)) {
    throw createHttpError(404, 'Invalid or missing category for this menu');
  }

  const categoryResults = await Promise.all(
    menuCategories.map(
      async (e) => menuService.containCategories(
        menuRepository(database),
        e.menu,
        ...e.categories
      )
    )
  );
  if (categoryResults.some(e => !e)) {
    throw createHttpError(404, 'Invalid category for this menu');
  }

  const menuProducts = order.menus
    .flatMap(m =>
      m.products.map(p => ({
        category: objectId(p.category) as ObjectId,
        product: objectId(p.product) as ObjectId
      }))
    );

  const productResults = await Promise.all(
    menuProducts.map(
      async (e) => categoryService.containProducts(
        categoryRepository(database),
        e.category,
        e.product
      )
    )
  );
  if (productResults.some(e => !e)) {
    throw createHttpError(404, 'Invalid product for this category');
  }

  const productsPrices = await Promise.all(
    productIdList
      .map(async productId => productService.findPrice(productRepository(database), productId))
  );

  const menusPrices = await Promise.all(
    menuIdList
      .map(async menuId => menuService.findPrice(menuRepository(database), menuId))
  );

  const productPrice = productsPrices.reduce((total, product) => total + product, 0);
  const menuPrice = menusPrices.reduce((total, product) => total + product, 0);

  return orderService.create(
    orderRepository(database),
    {
      ...{
        products: order.products.map(p => objectId(p) as ObjectId),
        menus: order.menus.map(m => ({
          menu: objectId(m.menu) as ObjectId,
          products: m.products.map(p => ({
            product: objectId(p.product) as ObjectId,
            category: objectId(p.category) as ObjectId
          }))
        }))
      },
      price: productPrice + menuPrice,
      orderNumber: getRandomOrderNumber()
    }
  );
};

/**
 * Attempts to remove an order from the database.
 * @param database the database in which to remove the order.
 * @param request the Express request object.
 * @returns the number of deleted orders.
 */
const remove = async (database: Db, request: Request): Promise<number> => {
  const [ id ] = validateRouteParams(request.params.id);
  return orderService.remove(orderRepository(database), id);
};

/**
 * Attempts to complete an order in the database by flagging it as fulfilled.
 * @param database the database in which to complete the order.
 * @param request the Express request object.
 * @returns the number of updated orders.
 */
const complete = async (database: Db, request: Request): Promise<number> => {
  const [ id ] = validateRouteParams(request.params.id);
  return orderService.complete(orderRepository(database), id);
};

export default { listCompleted, listPending, create, remove, findOne, complete };
