import * as Koa from 'koa'
import UserService from '../services/user';
import { Put, Get, Controller  } from '../decorators/router';
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

}
export default UserController;
