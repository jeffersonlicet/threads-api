import { RouterHandler } from 'core/router';
import Service from 'core/service/service';
import Database from 'services/database';

export default class User extends Service {
  handleRoot({ req }: RouterHandler) {
    console.log(Database.models);
    return 'welcome';
  }

  handleCreateUser() {
    return { user: {} };
  }
}