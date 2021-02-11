import specialOfferController from './special-offers.controller';

const routes: Route[] = [
  {
    method: 'get',
    path: '/',
    handler: specialOfferController.list
  },
  {
    method: 'put',
    path: '/menus/:id',
    handler: specialOfferController.createMenuOffer,
    options: {
      admin: true,
      update: true
    }
  },
  {
    method: 'put',
    path: '/products/:id',
    handler: specialOfferController.createProductOffer,
    options: {
      admin: true,
      update: true
    }
  }
];

export default routes;
