import { Request, Response } from 'express';
import { HttpError } from 'http-errors';

import { logger } from '../utils';

/**
 * Http error handler middleware.
 * @param err Express error object.
 * @param req Express request object.
 * @param res Express response object.
 */
export const handleError = (err: HttpError, req: Request, res: Response, { }) => {
  const httpCode = err.status ?? 500;
  const message = err.message ?? err.title;
  logger.error(`${req.originalUrl}: ${httpCode} - ${message}`);
  res.status(httpCode).json({ message: err.message });
};
