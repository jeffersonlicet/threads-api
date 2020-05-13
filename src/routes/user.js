import express from 'express';
import errorHandler from 'middlewares/errorHandler';

export default function UserRoute(controller) {
  const router = express.Router();

  router.get('/', errorHandler(controller.root));

  return router;
}
