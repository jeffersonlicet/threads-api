import { ModelAttributes } from 'sequelize/types';

export default interface SchemaDefinition {
  definition: ModelAttributes;
  options: Function;
}