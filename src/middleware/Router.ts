import * as KoaRouter from 'koa-router';
import { RequestMethod } from '../types';
import * as fb from 'fast-glob';

const router = new KoaRouter();
export type RouterType = (ctx: KoaRouter.IRouterContext, next: () => Promise<any>) => any;
export default class Router {
    static routesMap = new Map<{target: any, method?: RequestMethod, path: string}, RouterType >();
    constructor(controllersDir: string[]) {
        console.log("路由加载目录：", controllersDir)
        fb.sync(controllersDir).forEach(item => {
            console.log("开始加载路由模块：", item);
            require(item.toString())
        });
    }
    routes(): any {
        console.log("开始注册路由")
        for(let [config, value] of Router.routesMap) {
            const {method = RequestMethod.GET, target, path} = config;
            router[method](target.routerPrefix + path, value)
            console.log(`${method} ${target.routerPrefix + path}`)
        }
        console.log("路由注册完成")
        return router.routes();
    }
};
