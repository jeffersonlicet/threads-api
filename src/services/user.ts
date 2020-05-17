import { RouterHandler } from 'core/service';

export default class User {
  boot() {
   console.log('booting userService');
  }

  handleRoot({ res }: RouterHandler) {
    return 'welcome';
  }

  handleCreateUser() {
    return { user: {} };
  }
}