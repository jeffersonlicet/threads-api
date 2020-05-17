import Sequelize from 'sequelize';
import { Model } from 'core/model';

export default class User extends Model {
  public id!: number;
  public role!: string;
  public email!: string;
  public avatar!: string;
  public password!: string;
  public lastname!: string;
  public firstname!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  static schemaDefinition = {
    definition: {
      id: {
        type: Sequelize.NUMBER,
        autoIncrement: true,
        primaryKey: true,
      },
      role: Sequelize.STRING,
      email: Sequelize.STRING,
      avatar: Sequelize.STRING,
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE,
      password: Sequelize.STRING,
      lastname: Sequelize.STRING,
      firstname: Sequelize.STRING,
    },
    options: (sequelize: any) => ({
      modelName: 'user',
      sequelize,
    })
  };
}