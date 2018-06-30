import * as Koa from 'koa'
import UserService from '../services/user';

class UserController {
  private userService: UserService = new UserService()
  list = async (ctx: Koa.Context) => {
    ctx.body = this.userService.list()
  }
}
export default UserController;
