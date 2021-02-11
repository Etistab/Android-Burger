import { NextFunction } from 'express';

/**
 * No operation middleware.
 * @param next the next middleware.
 */
export const noOp = ({}, {}, next: NextFunction) => next();
