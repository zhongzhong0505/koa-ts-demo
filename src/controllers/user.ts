import * as Koa from 'koa'
import UserService from '../services/user';
import { router, prefix } from '../decorators/router';
import { RequestMethod } from '../types';

const userService: UserService = new UserService()

@prefix("/users")
class UserController {
  @router({method: RequestMethod.GET})
  async list(ctx: Koa.Context) {
    ctx.body = userService.list()
  }

  @router({method: RequestMethod.PUT})
  async add(ctx: Koa.Context) {
    ctx.body = [{"retcode": 0}];
  }

}
export default UserController;
