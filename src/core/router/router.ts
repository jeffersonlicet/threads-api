import { Service } from 'core/service';
import express from 'express';

export default class Router {
  service: Service;
  handler: express.Router;

  constructor(service: Service) {
    this.service = service;
    this.handler = express.Router();
  }

  get(path: string, handler: Function) {
    this.handler.get(path, async (req: express.Request, res: express.Response) => {
      res.send(await handler.call(this.service, req, res));
    });
  }

  post(path: string, handler: Function) {
    this.handler.post(path, async (req: express.Request, res: express.Response) => {
      res.send(await handler.call(this.service, req, res));
    });
  }
}