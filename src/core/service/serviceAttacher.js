export default class ServiceAttcher {
  init(deps) {
    Object.keys(deps).forEach((key) => {
      this[key] = deps[key];
    });
  }
}
