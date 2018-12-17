import "reflect-metadata";
import * as Koa from "koa";
import Router from "./middleware/Router";
import * as path from "path";
import * as log4js from "log4js";
import * as body from "koa-body";

import connectLogger from "./middleware/connect-logger";
import Annotation from "./middleware/Annotation";
import { createConnection } from "typeorm";
import { dbConfig } from "./config/dbconfig";

createConnection(dbConfig)
    .then(async (connection: any) => {
        const app = new Koa();

        // 错误处理
        app.use(async (ctx, next) => {
            try {
                await next();
                const result = ctx.body;
                if(ctx.status == 200) {
                    ctx.body = {
                        success: true,
                        result
                    };
                }
            } catch (err) {
                logger.error("SERVER ERROR:", err);
                ctx.status = err.status || err.code || 500;
                ctx.body = {
                    success: false,
                    message: err.message
                };
            }
        });

        //解析Request body数据
        app.use(body({ multipart: true }));

        // // 日志
        log4js.configure(path.join(__dirname, "./config/log4js.json"));
        app.use(connectLogger(log4js.getLogger("http"), { level: "auto" }));
        const logger = log4js.getLogger("app");

        // 注解
        const annotation = new Annotation([
            path.join(__dirname + "/services", "./*.js"),
            path.join(__dirname + "/services", "./*.ts")
        ]);
        app.use(annotation.autowired());

        // // 路由
        const router = new Router([
            path.join(__dirname + "/controllers", "./*.js"),
            path.join(__dirname + "/controllers", "./*.ts")
        ]);
        app.use(router.routes());

        // 错误日志
        app.on("error", (err, ctx) => {
            logger.error("SERVER ERROR:", err);
        });

        app.listen(3000);
        console.log("Server running on port 3000.");
    })
    .catch((error: Error) => console.log("TypeORM connection error: ", error));
