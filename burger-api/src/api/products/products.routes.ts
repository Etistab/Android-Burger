import productController from './products.controller';

/**
 * The products routes to mount on /products.
 */
const routes: Route[] = [
  {
    method: 'get',
    path: '/',
    handler: productController.list
  },
  {
    method: 'get',
    path: '/:id',
    handler: productController.findOne
  },
  {
    method: 'post',
    path: '/',
    handler: productController.create,
    options: {
      admin: true
    }
  },
  {
    method: 'put',
    path: '/:id',
    handler: productController.update,
    options: {
      update: true,
      admin: true
    }
  },
  {
    method: 'delete',
    path: '/:id',
    handler: productController.remove,
    options: {
      update: true,
      admin: true
    }
  }
];

export default routes;
