
import * as Router from 'koa-router';

export default (rules: Array<any>, ctx: Router.IRouterContext, next: () => Promise<any>) => {
    Object.assign(ctx.params, ctx.query);
    rules.forEach(rule => {
        if(typeof rule === "string") {
            if(!ctx.params[rule]) {
                ctx.throw(412, `Param ${rule} is required!`);
            }
        }else if(typeof rule === "object") {
            const {name, type, regex} = rule;
            if(!ctx.params[name]) {
                ctx.throw(412, `Param ${name} is required!`);
            }
            if(!(typeof ctx.params[name] === type)) {
                ctx.throw(412, `Param ${name} must be ${type}!`)
            }
            if(regex) {
                if(!String(ctx.params[name]).match(regex)){
                    ctx.throw(412, `Param ${name} must be match ${regex}!`)
                }
            }
        }
    });
    return next();
}