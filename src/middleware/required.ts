
import * as Router from 'koa-router';

export default (rules: Array<any>, ctx: Router.IRouterContext, next: () => Promise<any>) => {
    rules.forEach(rule => {
        if(typeof rule === "string") {
            Object.assign(ctx.params, ctx.query);
            if(!ctx.params[rule]) {
                ctx.throw(412, `Param ${rule} is required!`);
            }
        }else if(typeof rule === "object") {
            const {name, type, regex} = rule;
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