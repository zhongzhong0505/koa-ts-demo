import * as Koa from 'koa'
import { Get, Put, Controller } from '../decorators/router';

@Controller("/menus")
class MenuController {
  @Get()
  async list(ctx: Koa.Context) {
    ctx.body = [{"menuName": "首页"}]
  }

  @Put()
  async add(ctx: Koa.Context) {
    console.log("添加成功");
    ctx.body = [{"retcode": 0}];
  }

}
export default MenuController;