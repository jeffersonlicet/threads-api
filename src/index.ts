import { Container } from 'core/service';
import config from 'config';

/**
 * Boot all services
 */
Container.boot(config.servicesPath);
