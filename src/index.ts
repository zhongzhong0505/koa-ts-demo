import * as Koa from 'koa';
import Router from './middleware/Router';
import * as path from 'path';
import * as log4js from 'log4js';
import * as json from 'koa-json';

import connectLogger from './middleware/connect-logger';
const app = new Koa()

// JSON返回
app.use(json());

// 日志
log4js.configure(path.join(__dirname,'./config/log4js.json'));
app.use(connectLogger(log4js.getLogger('http'), {level: 'auto'}));
const logger = log4js.getLogger('app');

// 路由
const router = new Router([path.join(__dirname + "/controllers", "./*.ts")]);
app.use(router.routes())

// 错误处理
app.on("error", err => {
    logger.error("SERVER ERROR:", err);
});

app.listen(3000)
;
console.log("Server running on port 3000.")