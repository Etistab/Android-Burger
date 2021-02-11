import express from 'express';
import cors from 'cors';
import passport from 'passport';

import { logger } from './utils';
import { CONFIG } from './config';
import { handleError,notFound } from './middlewares';
import routes from './api/routes';

/**
 * Express HTTP application entrypoint.
 * Routes and middlewares setup.
 */
const main = () => {
  express()
    .use(cors())
    .use(express.json())
    .use(express.urlencoded({ extended: false }))
    .use(passport.initialize())
    .use('/api', routes)
    .use(notFound)
    .use(handleError)
    .listen(CONFIG.port, () => logger.info(`Server up and running on port ${CONFIG.port}!`))
    .on('error', error => (logger.error(error), process.exit(1)));
};

main();
