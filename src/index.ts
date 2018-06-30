import * as Koa from 'koa';
import * as Router from 'koa-router';
import userRouters from './routers/user'

const app = new Koa()

app.use(userRouters.routes())

app.listen(3000)

console.log("Server running on port 3000.")