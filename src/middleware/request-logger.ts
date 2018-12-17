import * as uuid from 'uuid/v4';
import * as log4js from 'log4js';
const log = log4js.getLogger("Request-Log");
export default () => {
  return async (ctx: any, next: any) => {
    try{
        let requestId = uuid();
        ctx.request.uuid = requestId;
        console.log(ctx.request);
        await next();
        console.log(JSON.stringify(ctx.response));
    }catch(err){
        log.error("记录请求日志出错", err);
    }
  }
}