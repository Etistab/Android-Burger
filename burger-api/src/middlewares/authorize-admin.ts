import { Request, NextFunction } from 'express';
import createHttpError from 'http-errors';

/**
 * Middleware handling authorization for admin routes.
 * @param request Express request object.
 * @param next the next middleware.
 * @returns the authorization middleware.
 */
export const authorizeAdmin = (request: Request, {}, next: NextFunction) => {
  if (!(request.user as any).isAdmin) {
    next(createHttpError(403, 'Must have admin rights to perform this action'));
  }
  next();
};
