function dateNormalize(date: any = undefined) {
  if (!date) {
    date = new Date();
  }
  if (Object.prototype.toString.call(date) == '[object Date]') {
    return date
  } else if (Object.prototype.toString.call(date) == '[object String]') {
    if (!isNaN(date)) {
      return new Date(Number(date))
    } else if (date.includes('T')) {
     return new Date(date)
    }
    else {
      return new Date(date.replace(/-/ig, '/'))
    }
  } else if (Object.prototype.toString.call(date) == "[object Number]") {
    return new Date(date)
  }
}
function Appendzero(obj) {
  if (obj < 10) {
    return '0' + '' + obj;
  }
  else {
    return obj;
  }
}
function formatDate(date: any = undefined, format: string = "") {
  date = dateNormalize(date);
  if (!format) {
    format = 'yyyy-MM-dd';
  }
  if (format == 'number') {
    return date.getTime();
  }
  const week = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', '日', '一', '二', '三', '四', '五', '六'];
  return format.replace(/yyyy|yy|MM|M|dd|d|hh|mm|ss|星期|周|www|week/g, function (a) {
    switch (a) {
      case 'yyyy':
        return date.getFullYear();
      case 'yy':
        return (date.getFullYear() + '').slice(2);
      case 'MM':
        return Appendzero(date.getMonth() + 1);
      case 'M':
        return date.getMonth() + 1;
      case 'dd':
        return Appendzero(date.getDate());
      case 'd':
        return date.getDate();
      case 'hh':
        return Appendzero(date.getHours());
      case 'mm':
        return Appendzero(date.getMinutes());
      case 'ss':
        return Appendzero(date.getSeconds());
      case '星期':
        return '星期' + week[date.getDay() + 7];
      case '周':
        return '周' + week[date.getDay() + 7];
      case 'week':
        return week[date.getDay()];
      case 'www':
        return week[date.getDay()].slice(0, 3);
    }
  })
}
/**
 * 计算还剩余多少时间 Note. format(hh时mm分ss秒)is required.
 * @param startTime seconds 20000
 * @param endTime YYYY年MM月DD日 hh时mm分ss秒
 * @param diffType prefix dd,hh,mm,ss,sss 天,小时，分，秒，毫秒
 * @returns {String} 剩余23时58分
 */
export const getDateDiff = (startTime: any, endTime: any, diff: string) => {
  startTime = dateNormalize(startTime)
  endTime = dateNormalize(endTime)
  let dateDiff = (endTime.getTime() - startTime.getTime()) / 1000;

  let iDay: any = Math.floor(dateDiff / (24 * 3600));
  iDay = iDay > 0 ? `${iDay}天` : "";

  let iHH: any = Math.floor(dateDiff % (24 * 3600) / 3600);
  iHH = iHH > 0 ? `${iHH}时` : "";

  let imm: any = Math.floor(dateDiff % (24 * 3600) % 3600 / 60);
  imm = imm > 0 ? `${imm}分` : "";

  let iss: any = Math.floor(dateDiff % (24 * 3600) % 3600 % 60);
  iss = iss > 0 ? `${iss}秒` : "";
  switch (diff) {
    case 'sss': return `${endTime.getTime() - startTime.getTime()}`;
    case 'ss': return `${iss}`;
    case 'mm': return `${imm}${iss}`;
    case 'hh': return `${iHH}${imm}${iss}`;
    case 'dd': return `${iDay}${iHH}${imm}${iss}`;
    default: return `${iDay}${iHH}${imm}${iss}`
  }
}

export default formatDate