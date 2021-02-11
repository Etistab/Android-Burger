import menuController from './menus.controller';

/**
 * The menus routes to mount on /menus.
 */
const routes: Route[] = [
  {
    method: 'get',
    path: '/',
    handler: menuController.list
  },
  {
    method: 'get',
    path: '/:id',
    handler: menuController.findOne
  },
  {
    method: 'post',
    path: '/',
    handler: menuController.create,
    options: {
      admin: true
    }
  },
  {
    method: 'put',
    path: '/:id',
    handler: menuController.update,
    options: {
      admin: true,
      update: true
    }
  },
  {
    method: 'delete',
    path: '/:id',
    handler: menuController.remove,
    options: {
      admin: true,
      update: true
    }
  },
  {
    method: 'post',
    path: '/:id/categories',
    handler: menuController.addCategories,
    options: {
      admin: true,
      update: true
    }
  },
  {
    method: 'delete',
    path: '/:id/categories/:categoryId',
    handler: menuController.removeCategory,
    options: {
      admin: true,
      update: true
    }
  }
];

export default routes;
