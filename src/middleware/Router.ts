import * as fb from 'fast-glob';
import * as KoaRouter from 'koa-router';
import Logger from '../common/log/Logger';
import { RequestMethod, RouterType } from '../types';
import { capitalizeEveryWord } from '../utils/string';
import Annotation from './Annotation';
const router = new KoaRouter();
const logger = new Logger();
// 路由参数
type RouterParam = Array<string | RouterType>;
/**
 * @description 自定义的路由中间件
 * @author zhongzhong
 * @date 2019-03-06
 * @export
 * @class Router
 */
export default class Router {
    public static routesMap = new Map<{
            target: any,
            method?: RequestMethod,
            path: string, prefix?: boolean
        }, RouterType[] >();
    constructor(controllersDir: string[]) {
        logger.log("路由加载目录：", controllersDir);

        fb.sync(controllersDir).forEach((item) => {
            logger.log("开始加载路由模块：", item);
            require(item.toString());
        });
    }
    public routes(): any {
        logger.log("开始注册路由");
        for (let [config, value] of Router.routesMap) {
            const {method = RequestMethod.GET, target, path, prefix} = config;
            // 存储路由的第一个参数
            const url = `${prefix ? target.routerPrefix + path : path}`;
            const params: RouterParam = [url];

            // 确保value是一个数组
            value = Array.isArray(value) ? value : [value];

            // 将每一个路由的函数绑定到对应的类实例上，类方法里面就可以通过this.XXXX获取类的成员变量
            value = value.map((item: RouterType) => item.bind(Annotation.instancesMap.get(capitalizeEveryWord(target.name))));

            // 使用apply将数组作为路由的参数传入
            router[method].apply(router, params.concat(value));
            logger.log(`${method} ${url}`);
        }
        logger.log("路由注册完成");
        return router.routes();
    }
}
