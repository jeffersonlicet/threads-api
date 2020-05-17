import { Container } from 'core/service';

export function Inject(): Function {
  return function (target: Object, propertyName: string) {
    Container.registerDependency(target.constructor.name.toLowerCase(), propertyName);
  }
}