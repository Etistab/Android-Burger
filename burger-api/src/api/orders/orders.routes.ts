import orderController from './orders.controller';

/**
 * The orders routes to mount on /orders.
 */
const routes: Route[] = [
  {
    method: 'get',
    path: '/completed',
    handler: orderController.listCompleted,
    options: {
      auth: true
    }
  },
  {
    method: 'get',
    path: '/pending',
    handler: orderController.listPending,
    options: {
      auth: true
    }
  },
  {
    method: 'get',
    path: '/:id',
    handler: orderController.findOne,
    options: {
      auth: true
    }
  },
  {
    method: 'post',
    path: '/',
    handler: orderController.create
  },
  {
    method: 'delete',
    path: '/:id',
    handler: orderController.remove,
    options: {
      auth: true,
      update: true
    }
  },
  {
    method: 'put',
    path: '/:id/complete',
    handler: orderController.complete,
    options: {
      auth: true,
      update: true
    }
  }
];

export default routes;
