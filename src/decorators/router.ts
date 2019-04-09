import Router from '../middleware/Router';

import Annotation from '../middleware/Annotation';
import { IRouteParamType, RequestMethod } from '../types';
import { capitalizeEveryWord } from '../utils/string';

const Prefix = (prefix: string) => {
    return (target: any) => {
        // 实例化一个类对象
        Annotation.instancesMap.set(capitalizeEveryWord(target.name), new target());
        // 存储实例名称和路由前缀到原型上，在初始化路由中间件的时候才可以获取到
        target.prototype.name = target.name;
        target.prototype.routerPrefix = prefix;
    };
};

const router = ({options, method}: {options: IRouteParamType | string, method: RequestMethod} ) => {
    options = options || "/";
    if (typeof options === "string") {
        return (target: any, name: string, value: PropertyDescriptor) => {
            Router.routesMap.set({
                target, path: options as string, method, prefix: true
            }, target[name]);
        };
    }
    const { path, prefix } = options as IRouteParamType;
    return (target: any, name: string, value: PropertyDescriptor) => {
        Router.routesMap.set({
            target, path, method, prefix
        }, target[name]);
    };
};

export const Controller = (path: string) => {
    return Prefix(path);
};

export const Get = (options?: IRouteParamType | string) => {
    return router({options, method: RequestMethod.GET});
};

export const Post = (options?: IRouteParamType | string) => {
    return router({options, method: RequestMethod.POST});
};

export const Delete = (options?: IRouteParamType | string) => {
    return router({options, method: RequestMethod.DELETE});
};

export const Put = (options?: IRouteParamType | string) => {
    return router({options, method: RequestMethod.PUT});
};

export const Options = (options?: IRouteParamType | string) => {
    return router({options, method: RequestMethod.OPTIONS});
};
