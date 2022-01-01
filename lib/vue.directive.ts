import formatDate, { getDateDiff } from './dateFormat';
/**
 * 四舍五入保留num位小数
 * @param v
 * @param num 保留位数
 * @returns {*}
 */
function toDecimal(v, num) {
  var f = parseFloat(v);
  if (isNaN(f)) {
    return false;
  }
  f = Math.round(v * (Math.pow(10, num))) / Math.pow(10, num);
  var s = f.toString();
  if (num) {
    var rs = s.indexOf('.');
    if (num > 0 && rs < 0) {
      rs = s.length;
      s += '.';
    }
    while (s.length <= rs + num) {
      s += '0';
    }
  }
  return s;
}

function getElementLeft(element) {
  var actualLeft = element.offsetLeft;
  var current = element.offsetParent;

  while (current !== null) {
    actualLeft += current.offsetLeft;
    current = current.offsetParent;
  }

  return actualLeft;
}

export default function (app) {
  app.directive('amount', {
    mounted(el, binding, vnode) {
      let element = el.tagName == 'INPUT' ? el : el.getElementsByTagName('input')[0]
      let len = !Number(binding.arg) ? 0 : Number(binding.arg);

      let curval = vnode.dirs.find(v => !!v.value);
      if (curval) {
        element.value = toDecimal(curval.value, len);
        el.dispatchEvent(new Event('input'))
      }

      element.addEventListener('keyup', function () {
        let val = element.value && element.value.replace(/[^\d\.]/g, '');
        element.value = val;
        el.dispatchEvent(new Event('input'))
      });

      element.addEventListener('blur', () => {
        let val = element.value && element.value.replace(/[^\d\.]/g, '');
        element.value = toDecimal(val, len);
        el.dispatchEvent(new Event('input'))
      })
    }
  });

  // v-number 
  app.directive('number', {
    mounted: (el, binding, vnode) => {
      let element = el.tagName == 'INPUT' ? el : el.getElementsByTagName('input')[0];

      let curval = vnode.dirs.find(v => !!v.value);
      if (curval) {
        element.value = curval.value.replace(/[^\d\.]/g, '');
        el.dispatchEvent(new Event('input'))
      }
      element.addEventListener('keyup', function () {
        let val = element.value && element.value.replace(/[^\d\.]/g, '');
        element.value = val;
        el.dispatchEvent(new Event('input'))
      });
      element.addEventListener('blur', () => {
        let val = element.value && element.value.replace(/[^\d\.]/g, '');
        element.value = val;
        el.dispatchEvent(new Event('input'))
      })
    }
  });

  // v-date="yyyy-MM-dd" 
  app.directive('date', {
    mounted: (el, binding, vnode) => {
      let formate = binding.value;
      let value = el.innerText;
      el.innerText = formatDate(value, formate)
    }
  })

  // v-diff:mm="{startime:'1623044574104',endtime:new Date()}"
  app.directive('diff', {
    mounted: (el, binding, vnode) => {
      let md = binding.arg;//dd,hh,mm,ss,sss 天,小时，分，秒，毫秒
      el.innerText = getDateDiff(binding.value.startime, binding.value.endtime, md)
    }
  })

  app.directive('autotip', {
    updated: (el, binding, vnode) => {
      let left = getElementLeft(el)
      let width = el.offsetWidth;
      console.log(left, width, document.body.clientWidth)
    }
  })

  app.directive('valid', {
    mounted: (el, binding, vnode) => {
    }
  })

}