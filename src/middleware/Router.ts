import * as KoaRouter from 'koa-router';
import { RequestMethod, RouterType } from '../types';
import * as fb from 'fast-glob';

const router = new KoaRouter();

// 路由参数
type RouterParam = Array<string | RouterType>;
export default class Router {
    static routesMap = new Map<{target: any, method?: RequestMethod, path: string}, Array<RouterType> >();
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
            //存储路由的第一个参数
            let params : RouterParam = [target.routerPrefix + path];
            
            // 确保value是一个数组
            value = Array.isArray(value) ? value : [value];

            // 将每一个路由的函数绑定到对应的类实例上，类方法里面就可以通过this.XXXX获取类的成员变量
            value = value.map((item: RouterType) => item.bind(target));

            // 使用apply将数组作为路由的参数传入
            router[method].apply(router, params.concat(value))
            console.log(`${method} ${target.routerPrefix + path}`)
        }
        console.log("路由注册完成")
        return router.routes();
    }
};
