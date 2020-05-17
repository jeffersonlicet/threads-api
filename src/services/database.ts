import { Service } from 'core/service';
import { Model } from 'core/model';
import scan from 'core/scan';
import config from 'config';

import { Sequelize } from 'sequelize';
import { connection } from 'config/db';

interface ModelInstances {
  [any: string]: Model,
}

export default class Database extends Service {
  static models: ModelInstances = {};

  static modelName(str: string) {
    return `${str}Model`;
  }

  boot() {
    const sequelize = new Sequelize(
      connection.database,
      connection.username,
      connection.password,
        {
        host: connection.host,
        port: connection.port,
        dialect: 'mysql',
     });

     scan(config.modelsPath, (file: string, filename: string)  => {
      const model = require(file).default;
      const { definition, options } = model.schemaDefinition;
      model.init(definition, options(sequelize));
      Database.models[Database.modelName(filename)] = model;
    });

    sequelize
      .authenticate()
      .then(() => {
        console.log('Connection has been established successfully.');
      })
      .catch((error: any) => {
        console.error('Unable to connect to the database:', error);
      });
  }
}