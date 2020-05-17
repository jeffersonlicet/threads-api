import express from 'express';

export default interface routerHandler {
  req: express.Request;
  res: express.Response;
  next: express.NextFunction;
}