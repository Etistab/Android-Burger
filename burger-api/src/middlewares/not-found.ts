import { NextFunction } from 'express';
import createHttpError from 'http-errors';

/**
 * Not found middleware, is triggered if no route is matched.
 * @param next the next middleware.
 */
export const notFound = ({}, {}, next: NextFunction) => next(createHttpError(404, 'Requested route not found'));
