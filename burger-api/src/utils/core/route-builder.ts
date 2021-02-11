import { Router, Request, Response } from 'express';

import { connectDatabase, noOp, handleUpdate, authenticate, authorizeAdmin } from '../../middlewares';

/**
 * Mounts the API's route into an Express router object.
 * @param paths the list of prefixed routes to mount.
 * @returns the configured Express router.
 */
export const buildRoutes = (paths: Path[]): Router => {
  const router = new (Router as any)();

  paths.forEach(p => {
    p.routes.forEach(r => {
      router[r.method](
        p.path + r.path,
        r.options?.admin || r.options?.auth ? authenticate() : noOp,
        r.options?.admin  ? authorizeAdmin : noOp,
        connectDatabase(r.handler),
        r.options?.update ? handleUpdate : noOp,
        (request: Request, response: Response) => response.json(request.app.locals.result)
      );
    });
  });

  return router;
};
