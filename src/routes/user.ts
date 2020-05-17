import UserService from 'services/user';
import errorHandler from 'middlewares/errorHandler';
import { Router } from 'core/service';

export default function UserRoute(router: Router, service: UserService) {
  router.get('/', errorHandler(service.handleRoot));
  router.get('/create', errorHandler(service.handleCreateUser));
}
