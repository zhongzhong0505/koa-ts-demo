import required from '../middleware/required';


type Rule = string | {name: string, type: string, regex?: string};

export const Required = (... rules: Rule[]) => {
    return (target: any, name: string, value: PropertyDescriptor) => {
        target[name] = Array.isArray(target[name]) ? target[name] : [target[name]];
        // 路由处理函数的数组第一个位置插入校验方法
        target[name].splice(0, 0, required.bind(null, rules));
    };
};
