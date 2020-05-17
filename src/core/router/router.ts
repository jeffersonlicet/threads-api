import { Service } from 'core/service';
import express from 'express';
import errorHandler from 'middlewares/errorHandler';

export default class Router {
  service: Service;
  handler: express.Router;

  constructor(service: Service) {
    this.service = service;
    this.handler = express.Router();
  }

  get(path: string, middlewares: Array<any>, handler: Function) {
    this.handler.get(path,
      ...middlewares,
      errorHandler(
        async (req: express.Request, res: express.Response, next: express.NextFunction) => {
          res.send(await handler.call(this.service, { req, res, next }));
        }
      )
    );
  }

  post(path: string, middlewares: Array<any>, handler: Function) {
    this.handler.post(path,
      ...middlewares,
      errorHandler(
        async (req: express.Request, res: express.Response, next: express.NextFunction) => {
          res.send(await handler.call(this.service, { req, res, next }));
      })
    );
  }
}