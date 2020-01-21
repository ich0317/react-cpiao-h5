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

/**
 * 日期转时间戳(10位)
 * @param { Date } 如 2012-10-12 20:12:20
 */
export const Date2Ts = date => {
    let oDate = date.replace(/-/g,'/');
    return Math.floor(new Date(oDate).getTime() / 1000)
}

/**
 * 时间戳转日期格式
 */
export const timestamp2Date = (ts, format = '{Y}-{M}-{D}') => {
 
  ts = Number(ts) ? ts : new Date((ts.replace(/-/g,'/'))).getTime() / 1000
  let oDate = new Date(ts * 1000);
  let to0 = n => (n * 1 < 10 ? "0" + n : n);
  let setDate = {
    Y:oDate.getFullYear(),
    M:to0(oDate.getMonth() + 1),
    D:to0(oDate.getDate()),
    h:to0(oDate.getHours()),
    m:to0(oDate.getMinutes()),
    s:to0(oDate.getSeconds()),
    w: oDate.getDay()
  }
  return format.replace(/{(Y|M|D|h|m|s|w)+}/g,(v,k)=>{
    let val = setDate[k]
    
    if (k === 'w') {
      let week = ['日', '一', '二', '三', '四', '五', '六']
      val = week[val]
    }
   return val
 })
}

/**
 * 个位数前补0
 */
export const singleTo0 = num => num * 1 < 10 ? ('0' + num) * 1 : num;

/**
 * 计算两点之间距离 
 */
export const getDistance = (lat1, lng1, lat2, lng2) => {
    let getRad = d => {
        var PI = Math.PI;
        return (d * PI) / 180.0;
      };
    
      let f = getRad((lat1 * 1 + lat2 * 1) / 2);
      let g = getRad((lat1 * 1 - lat2 * 1) / 2);
      let l = getRad((lng1 * 1 - lng2 * 1) / 2);
      let sg = Math.sin(g);
      let sl = Math.sin(l);
      let sf = Math.sin(f);
      let s, c, w, r, d, h1, h2;
      let a = 6378137.0; //The Radius of eath in meter.
      let fl = 1 / 298.257;
      sg = sg * sg;
      sl = sl * sl;
      sf = sf * sf;
      s = sg * (1 - sl) + (1 - sf) * sl;
      c = (1 - sg) * (1 - sl) + sf * sl;
      w = Math.atan(Math.sqrt(s / c));
      r = Math.sqrt(s * c) / w;
      d = 2 * w * a;
      h1 = (3 * r - 1) / 2 / c;
      h2 = (3 * r + 1) / 2 / s;
      s = d * (1 + fl * (h1 * sf * (1 - sg) - h2 * (1 - sf) * sg));
      s = Math.round(s); //指定小数点后的位数。
    return s;
}

/**
 * 数组对象查重
 * @param {array, object, string}
 *
 */
export const findInArr = (arr, newObj, key) => {
    let i = 0
    for (i; i < arr.length; i++) {
      if (arr[i][key] === newObj[key]) {
        return i
      }
    }
    return -1
  }