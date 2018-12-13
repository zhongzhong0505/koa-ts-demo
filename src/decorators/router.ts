import Router from '../middleware/Router';

import { RequestMethod } from '../types';

const prefix = (prefix: string) => {
    return (target: any) => {
        target.prototype['routerPrefix'] = prefix;
    }
}

const router = ({path = "/", method} : {path?: string, method: RequestMethod} ) => {
    return (target: any, name: string, value: PropertyDescriptor) => {
        Router.routesMap.set({
            target, path, method
        }, target[name]);
    }
}

export const Controller = (path: string) => {
    return prefix(path);
}

export const Get = (path: string = "/") => {
    return router({path, method: RequestMethod.GET});
}

export const Post = (path: string = "/") => {
    return router({path, method: RequestMethod.POST});
}

export const Delete = (path: string = "/") => {
    return router({path, method: RequestMethod.DELETE});
}

export const Put = (path: string = "/") => {
    return router({path, method: RequestMethod.PUT});
}

export const Options = (path: string = "/") => {
    return router({path, method: RequestMethod.OPTIONS});
}



