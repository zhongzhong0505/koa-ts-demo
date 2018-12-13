import * as Koa from 'koa'
import UserService from '../services/user';
import { Put, Get, Controller, Post  } from '../decorators/router';
import { Autowired } from '../decorators/autowired';


@Controller("/users")
class UserController {
  @Autowired()
  private userService: UserService;

  @Get()
  async list(ctx: Koa.Context) {
    ctx.body = this.userService.list()
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
    console.log((ctx.request as any).body);
    console.log((ctx.request as any).files)
  }

}
export default UserController;
