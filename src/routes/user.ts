import UserService from 'services/user';
import { Router } from 'core/router';

import authenticated from 'middlewares/authenticated';

export default function UserRoute(router: Router, service: UserService) {
  router.post('/', [authenticated], service.handleCreateUser);
  router.get('/:id',[authenticated],  service.handleCreateUser);
}
