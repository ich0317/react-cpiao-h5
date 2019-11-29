/**
 * 范围随机数
 * @param { Number, Number}
 * min 范围最小数
 * max 范围最大数
 */
export const randomNumRange = (min, max) => Math.random() * (max - min) + min;
/**
 * 检测{}对象是否相等
 */
export const equalsObj = (a , b) => {
    // if(a === b) return true;
    // return Object.keys(a).every(v => equalsObj(a[v], b[v]))

    if (a === b) return true;

    let keys = Object.keys(a);

    return keys.every(k => equalsObj(a[k], b[k]));
}