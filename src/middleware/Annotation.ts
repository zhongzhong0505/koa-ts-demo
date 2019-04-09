import * as fb from 'fast-glob';
import * as Koa from 'koa';
import Logger from '../common/log/Logger';
const logger = new Logger();
/**
 * @description 注解中间件
 * @author zhongzhong
 * @date 2019-03-06
 * @export
 * @class Annotation
 */
export default class Annotation {
    public static instancesMap = new Map<string, any>();

    constructor(autowiredDirs: string[]) {
        logger.log("注解加载目录：", autowiredDirs);
        fb.sync(autowiredDirs).forEach((item) => {
            logger.log("开始加载注解", item);
            require(item.toString());
        });
        logger.log("注解实例集合：", Annotation.instancesMap);
    }
    public autowired() {
        return async (ctx: Koa.Context, next: () => Promise<any>) => {
            await next();
        };
    }
}
