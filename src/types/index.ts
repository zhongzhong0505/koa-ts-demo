
import * as Router from 'koa-router';

export enum RequestMethod {
    GET="get", POST="post", DELETE="delete", PUT="put", OPTIONS="options"
}


export type RouterType = (ctx: Router.IRouterContext, next: () => Promise<any>) => any;