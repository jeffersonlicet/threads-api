import { RouterHandler } from 'core/router';

import Service from 'core/service/service';
import UserModel from 'models/user';
import { Inject } from 'core/service';
import Database from 'services/database';

export default class User extends Service {
  @Inject()
  databaseService!: Database;

  async handleCreateUser({ req }: RouterHandler) {
   const user = await UserModel.create(req.body);
   return { user };
  }
}