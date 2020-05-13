import { Controller } from 'core/controller';

export default class UserController extends Controller {
  root(req, res) {
    res.send({ root: 1 });
  }
}
