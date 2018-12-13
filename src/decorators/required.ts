import required from '../middleware/required';


type Rule = string | {name: string, type: string, regex?: string};

export default (... rules: Rule[]) => {
    return (target: any, name: string, value: PropertyDescriptor) => {
        target[name] = Array.isArray(target[name]) ? target[name] : [target[name]];
        target[name].splice(0,0, required.bind(null, rules));
    }
}