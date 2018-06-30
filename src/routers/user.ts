import * as Router from 'koa-router';
import UserController from '../controllers/user';

const router = new Router({prefix: "/users"})
const userController = new UserController()

router.get("/", userController.list)


export default router
