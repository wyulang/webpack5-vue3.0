export const trim = (str) => {
  return str ? String(str).replace(/^\s+|\s+$/g, '') : '';
};
// remove '-' ' '
export const clearStr = (str) => {
  return str ? str.replace(/\s+|\-/g, '') : '';
};
// TOP 图片验证码的验证表达式
export const isOtpCode = (source) => {
  return /^.{4}$/.test(trim(source));
};
// 邮政编码
export const isPostCode = (source) => {
  return /^[1-9][0-9]{5}$/.test(trim(source));
};
// 身份证号码验证表达式
export const isIdCard = (source) => {
  return /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(clearStr(source));
};
// 银行卡号码验证表达式
export const isBankCard = (source) => {
  return /^\d{12,}$/.test(clearStr(source));
};
// 所有字符必须为中文字符
export const isChCode = (source) => {
  return /[^\u4e00-\u9fa5\s+]/ig.test(trim(source));
};
// 所有的英文字符
export const isEnCode = (source) => {
  return /^[a-zA-Z\s]+$/.test(trim(source));
};
// 验证手机号码/^1[3|4|5|8][0-9]\d{4,8}$/
export const isMobile = (source) => {
  return /^1[3-9][0-9]\d{8}$/.test(clearStr(source));
};
// 移除字符串空字符串
export const isRequired = (source) => {
  return trim(source).length > 0;
};
// HTTP URL 地址
export const isHttpUrl = (source) => {
  return /^https?:\/\//.test(trim(source));
};

// 只能输入数字
export const isMumber = (source) => {
  return /^\d{1,}$/.test(clearStr(source));
};

export const isWxBrowser = () => {
  let ua = window.navigator.userAgent.toLowerCase()
  // 通过正则表达式匹配ua中是否含有MicroMessenger字符串
  let _micro = ua.match(/MicroMessenger/i)
  if (_micro === 'micromessenger' || (_micro && _micro[0] === 'micromessenger')) {
    return true
  } else {
    return false
  }
}
