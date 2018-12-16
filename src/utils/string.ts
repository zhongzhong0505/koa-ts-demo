/**
 * 首字母小写的方法
 * @param str String 待转换字符串
 */
export const capitalizeEveryWord = (str: string) => str.slice(0,1).toLowerCase() + str.slice(1);
