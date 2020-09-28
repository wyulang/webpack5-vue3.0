export function amount(arg1, arg2, operator) {
  var oper = ['+', '-', '*', '/'];
  // 不合法的运算
  if (isNaN(arg1) || isNaN(arg2) || oper.indexOf(operator) < 0) {
    return NaN;
  }
  // 除以0
  if (operator === '/' && Number(arg2) === 0) {
    return Infinity;
  }
  // 和0相乘
  if (operator === '*' && Number(arg2) === 0) {
    return 0;
  }
  // 相等两个数字相减
  if ((arg1 === arg2 || Number(arg1) === Number(arg2)) && operator === '-') {
    return 0;
  }
  var r1, r2, max, _r1, _r2;
  try { r1 = arg1.toString().split(".")[1].length } catch (e) { r1 = 0 }
  try { r2 = arg2.toString().split(".")[1].length } catch (e) { r2 = 0 }
  max = Math.max(r1, r2)
  _r1 = max - r1;
  _r2 = max - r2;
  if (_r1 !== 0) {
    arg1 = arg1 + '0'.repeat(_r1)
  }
  if (_r2 !== 0) {
    arg2 = arg2 + '0'.repeat(_r2)
  }
  arg1 = Number(arg1.toString().replace('.', ''))
  arg2 = Number(arg2.toString().replace('.', ''))
  var r3 = operator === '*' ? (max * 2) : (operator === '/' ? 0 : max);
  var newNum = eval(arg1 + operator + arg2);

  if (r3 !== 0) {
    var nStr = newNum.toString();
    nStr = nStr.replace(/^-/, '');
    if (nStr.length < r3 + 1) {
      nStr = '0'.repeat(r3 + 1 - nStr.length) + nStr;
    }
    nStr = nStr.replace(new RegExp('(\\\d{' + r3 + '})$'), '.$1');
    if (newNum < 0) {
      nStr = '-' + nStr;
    }
    newNum = nStr * 1;
  }
  return newNum;
}