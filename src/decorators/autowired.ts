import Annotation from '../middleware/Annotation'; 
import { capitalizeEveryWord } from '../utils/string';

export const Autowired = () => {
    return (target: any, name: string) => {
        target[name] = Annotation.instancesMap.get(name);
        if(!target[name]) {
            throw new Error(`属性${name}没有可用的实例。`);
        }
    }
}

export const Service = () => {
    return (target: any) => {
        Annotation.instancesMap.set(capitalizeEveryWord(target.name), new target());
    }
}