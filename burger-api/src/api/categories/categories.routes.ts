import categoryController from './categories.controller';

/**
 * The categories routes to mount on /categories.
 */
const routes: Route[] = [
  {
    method: 'get',
    path: '/',
    handler: categoryController.list
  },
  {
    method: 'get',
    path: '/:id',
    handler: categoryController.findOne
  },
  {
    method: 'post',
    path: '/',
    handler: categoryController.create,
    options: {
      admin: true
    }
  },
  {
    method: 'put',
    path: '/:id',
    handler: categoryController.update,
    options: {
      admin: true,
      update: true
    }
  },
  {
    method: 'delete',
    path: '/:id',
    handler: categoryController.remove,
    options: {
      admin: true,
      update: true
    }
  },
  {
    method: 'post',
    path: '/:id/products',
    handler: categoryController.addProducts,
    options: {
      update: true
    }
  },
  {
    method: 'delete',
    path: '/:id/products/:productId',
    handler: categoryController.removeProduct,
    options: {
      admin: true,
      update: true
    }
  }
];

export default routes;
