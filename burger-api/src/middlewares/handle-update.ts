import { Request, NextFunction } from 'express';
import createHttpError from 'http-errors';

/**
 * Middleware handling updates:
 * if a nullish value is returned by a controller
 * the middleware will create a 404 http error.
 * @param request Express request object.
 * @param next the next middleware.
 */
export const handleUpdate = (request: Request, {}, next: NextFunction) => {
  if (!request.app.locals.result) {
    next(createHttpError(404, 'Requested resource not found'));
  }
  request.app.locals.result = {};
  next();
};
