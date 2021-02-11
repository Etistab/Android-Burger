import { buildRoutes } from '../utils';

import menuRoutes from './menus/menus.routes';
import categoryRoutes from './categories/categories.routes';
import productRoutes from './products/products.routes';
import orderRoutes from './orders/orders.routes';
import specialOfferRoutes from './special-offers/special-offers.routes';

/**
 * The routes to mount on /api.
 */
const paths: Path[] = [
  { path: '/products', routes: productRoutes },
  { path: '/categories', routes: categoryRoutes },
  { path: '/menus', routes: menuRoutes },
  { path: '/orders', routes: orderRoutes },
  { path: '/special-offers', routes: specialOfferRoutes }
];

const router = buildRoutes(paths);

export default router;
