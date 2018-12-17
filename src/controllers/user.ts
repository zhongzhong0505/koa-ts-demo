import * as Koa from 'koa'
import UserService from '../services/user';
import { Autowired, Put, Get, Controller, Post, Required } from '../decorators';

@Controller("/users")
class UserController {
  @Autowired()
  private userService: UserService;

  @Get()
  // @Required('id', {
  //   name : 'id',
  //   type: 'number'
  // })
  async list(ctx: Koa.Context, next: any) {
    ctx.body = await this.userService.list();
    throw new Error()
    // return next();
  }

  @Put()
  async add(ctx: Koa.Context) {
    ctx.body = [{"retcode": 0}];
  }

  @Get('/:id')
  async getById(ctx: Koa.Context) {
    console.log(ctx.params.id)
    ctx.body = [{"retcode": 0}]
  }

  @Post()
  async upload(ctx : Koa.Context) {
    console.log(ctx)
    console.log((ctx.request as any).body);
    console.log((ctx.request as any).files)
  }

}
export default UserController;
