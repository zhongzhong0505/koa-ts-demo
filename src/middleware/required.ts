
import * as Router from 'koa-router';
import Logger from '../common/log/Logger';
const logger = new Logger();
/**
 * 必填和类型校验中间件
 */
export default (rules: any[], ctx: Router.IRouterContext, next: () => Promise<any>) => {
    const params: any = {};
    Object.assign(params, ctx.params, ctx.query, ctx.request.body);
    rules.forEach((rule) => {
        if (typeof rule === "string") {
            if (!params[rule]) {
                ctx.throw(412, `Param ${rule} is required!`);
                logger.error(`Param ${rule} is required!`);
            }
        } else if (typeof rule === "object") {
            const {name, type, regex} = rule;
            if (!params[name]) {
                ctx.throw(412, `Param ${name} is required!`);
                logger.error(`Param ${name} is required!`);
            }
            if (type === "number") {
                if (!String(params[name]).match(/^\d+$/)) {
                    ctx.throw(412, `Param ${name} must be number!`);
                    logger.error(`Param ${name} must be number!`);
                }
            } else if (!(typeof params[name] === type)) {
                ctx.throw(412, `Param ${name} must be ${type}!`);
                logger.error(`Param ${name} must be ${type}!`);
            }
            if (regex) {
                if (!String(params[name]).match(regex)) {
                    ctx.throw(412, `Param ${name} must be match ${regex}!`);
                    logger.error(`Param ${name} must be match ${regex}!`);
                }
            }
        }
    });
    return next();
};
