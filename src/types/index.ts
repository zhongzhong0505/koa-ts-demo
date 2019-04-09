
import * as Router from 'koa-router';

export enum RequestMethod {
    GET="get", POST="post", DELETE="delete", PUT="put", OPTIONS="options"
}


export type RouterType = (ctx: Router.IRouterContext, next: () => Promise<any>) => any;

export interface IRouteParamType {
    path?: string;  // 路由路径
    prefix?: boolean; // 是否添加路由前缀，默认true
}
