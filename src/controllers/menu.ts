import * as Koa from 'koa'
import UserService from '../services/user';
import { router, prefix } from '../decorators/router';
import { RequestMethod } from '../types';

@prefix("/menus")
class MenuController {
  @router({method: RequestMethod.GET})
  async list(ctx: Koa.Context) {
    ctx.body = [{"menuName": "首页"}]
  }

  @router({method: RequestMethod.PUT})
  async add(ctx: Koa.Context) {
    console.log("添加成功");
    ctx.body = [{"retcode": 0}];
  }

}
export default MenuController;