import scan from 'core/scan';
import { Router } from 'core/router';
import { Service, Container } from 'core/service';

import config from 'config';

import express from 'express';
import bodyParser from 'body-parser';

const PORT = process.env.PORT || 8080;

class Express extends Service {
  static app: any;

  async boot() {
    Express.app = express();
    Express.app.use(bodyParser.json());

    Express.app.use((
      err: express.Errback,
      req: express.Request,
      res: express.Response,
      next: express.NextFunction
    ) => {
      res.status(422).json(err);
    });

    const routes: { RouteHander: any; RouteName: string; }[] = [];

    scan(config.routesPath, (file: string, filename: string)  => {
      routes.push({ RouteHander: require(file).default, RouteName: filename });
    });

    routes.forEach(({ RouteHander, RouteName }) => {
      const service = Container.getService(RouteName, true);
      const router = new Router(service);
      RouteHander(router, service);
      Express.app.use(`/${RouteName}`, router.handler);
    });

    Express.app.listen(PORT, () => {
      console.log(`Listening on port:${PORT}`);
    });
  }
}

export default Express;
