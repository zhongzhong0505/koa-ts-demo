import Router from '../middleware/Router';

import { RequestMethod } from '../types';

export const prefix = (prefix: string) => {
    return (target: any) => {
        target.prototype['routerPrefix'] = prefix;
    }
}

export const router = ({path = "/", method} : {path?: string, method: RequestMethod} ) => {
    return (target: any, name: string, value: PropertyDescriptor) => {
        Router.routesMap.set({
            target, path, method
        }, target[name]);
    }
}