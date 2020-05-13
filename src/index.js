import { Container } from 'core/service';
import config from 'config';

/**
 * Boot all services
 */
Container
  .getInstance()
  .boot(config.servicesPath);
