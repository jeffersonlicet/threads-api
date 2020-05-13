/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
import ExpressService from 'core/services/express';

const PORT = process.env.PORT || 8080;

class Express extends ExpressService {
  static settings = {
    port: PORT,
  };

  boot() {
    super.boot(Express.settings);
  }
}

export default Express;
