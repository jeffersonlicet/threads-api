import express from 'express';
import { Service } from 'core/service';

export default function errorHandler(fn: Function) {
  return async function (
    this: Service,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) {
    try {
      return await fn.call(this, req, res, next);
    } catch (err) {
      console.log(err);
      next(err);
    }
  }
}
