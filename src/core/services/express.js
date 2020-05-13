/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
import scan from 'core/scan';
import { Service, Container } from 'core/service';

import config from 'config';

import express from 'express';
import bodyParser from 'body-parser';

const PORT = process.env.PORT || 8080;

class Express extends Service {
  static name = 'express';

  static app = null;

  async init(deps) {
    super.init(deps);

    console.log('Bootin express service');
    Express.app = express();
    Express.app.use(bodyParser.json());
    Express.app.use((err, req, res, next) => {
      res.status(422).json(err);
    });

    const controllers = [];
    const routes = [];

    scan(config.controllersPath, (file, filename) => {
      controllers.push({ Controller: require(file).default, ControllerName: filename });
    });

    scan(config.routesPath, (file, filename) => {
      routes.push({ Route: require(file).default, RouteName: filename });
    });

    const controllersMap = new Map();

    await Promise.all(controllers.map(({ Controller, ControllerName }) => {
      const instance = new Controller();
      controllersMap.set(ControllerName, instance);
      return instance.init(Container.getInstance().getServices());
    }));

    routes.forEach(({ Route, RouteName }) => {
      Express.app.use(`/${RouteName}`, Route(controllersMap.get(RouteName)));
    });

    Express.app.listen(PORT, () => {
      console.log(`Listening on port:${PORT}`);
    });
  }

  boot(settings) {
    this.settings = settings;
  }
}

export default Express;
