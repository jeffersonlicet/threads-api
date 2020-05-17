import scan from 'core/scan';
import { Service } from 'core/service';
import { ServiceConstructor, IService } from 'core/service/IService';

interface ServiceInstances {
  [key: string]: Service,
}

interface ServiceInyections {
  [key: string]: Array<string>,
}

export default class Container {
  static services: ServiceInstances  = {};
  static inyections: ServiceInyections = {};

  static serviceName(str: string) {
    return `${str}Service`;
  }

  static registerDependency(targetName: string, requiredServiceName: string) {
    const serviceName = Container.serviceName(targetName);

    if (Container.inyections[serviceName]) {
      Container.inyections[serviceName].push(requiredServiceName);
    } else {
      Container.inyections[serviceName] = [requiredServiceName];
    }
  }

  static async boot(dirname: string) {
    const services: Array<{ Service: ServiceConstructor, ServiceName: string }> = [];
    scan(dirname, (file: string, filename: string) => {
      services.push({
        Service: require(file).default,
        ServiceName: Container.serviceName(filename),
      });
    });

    services.forEach(({ Service, ServiceName }) => {
      Container.services[ServiceName] = new Service();
    });

    services.forEach(({ ServiceName }) => {
      if (Container.inyections[ServiceName]) {
        Container.inyections[ServiceName].forEach((dependency: string) => {
          const service: IService =  Container.services[ServiceName];
          service[dependency] = Container.services[dependency];
        })
      }
    });

    await Promise.all(services.map(({ ServiceName }) => Container.services[ServiceName].boot()));
  }

  static getServices() {
    return Container.services;
  }

  static getService(name: string, createServiceName: boolean = false) {
    const service = Container.services[createServiceName? Container.serviceName(name): name];

    if (!service) {
      throw new Error(`Cannot found service ${name}`);
    }

    return service;
  }
}
