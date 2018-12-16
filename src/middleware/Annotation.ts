import * as Koa from 'koa';
import * as fb from 'fast-glob';

export default class Annotation{
    static instancesMap = new Map<string, any>();
    constructor(autowiredDirs: string[]) {
        console.log("注解加载目录：", autowiredDirs)
        fb.sync(autowiredDirs).forEach(item => {
            console.log("开始加载注解", item);
            require(item.toString())
        });
        console.log("注解实例集合：", Annotation.instancesMap)
    }
    autowired() {
        return async (ctx: Koa.Context, next: () => Promise<any>) => {
            await next();
        }
    }
} 