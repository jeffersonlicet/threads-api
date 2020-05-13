import scan from 'core/scan';

export default class Container {
  static instance = null;

  static services = {};

  static getInstance() {
    if (Container.instance === null) {
      Container.instance = new Container();
    }

    return Container.instance;
  }

  async boot(dirname) {
    const services = [];
    const serviceMap = new Map();

    scan(dirname, (file, filename) => {
      services.push({ Service: require(file).default, ServiceName: filename });
    });

    await Promise.all(services.map(({ Service, ServiceName }) => {
      const instance = new Service();
      serviceMap.set(ServiceName, instance);
      return instance.boot();
    }));

    Container.services = [
      ...serviceMap.entries()
    ].reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {});

    await Promise.all(services.map(({ ServiceName }) => {
      const instance = serviceMap.get(ServiceName);
      return instance.init(Container.services);
    }));
  }

  get() {}

  getServices() {
    return Container.services;
  }
}
