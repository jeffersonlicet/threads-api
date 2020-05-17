import { Model } from 'sequelize';
import { SchemaDefinition } from 'core/model';

export default class BaseModel extends Model {
  static schemaDefinition: SchemaDefinition;
}
