import envBase from './env-base.js';
export class config extends envBase {
  constructor() {
    super();
  }

  //1:金榜题名，2：浙考一点通
  getEnvName() {
    let env = 1;
    let url = window.location.href;
    if (url.includes('pioneeringedu')) {
      env = 2;
    }
    // return env;
    return 1;
  }

  type = this.getEnvName();
  // type = 2;

  //取浏览参数
  getUrlParame(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);//search,查询？后面的参数，并匹配正则
    if (r != null) return unescape(r[2]); return null;
  }

  toHref(href, target, obj) {
    let el = document.createElement("a");
    document.body.appendChild(el);
    el.href = href;
    if (obj) {
      let parm = href.includes('?') ? '' : '?';
      for (let item in obj) {
        parm += `${item}=${obj[item]}&`;
      }
      parm = parm.substring(0, parm.length - 1);
      el.href += parm;
    }
    if (!target) {
      el.target = '_blank';
    }
    el.click();
    document.body.removeChild(el);
  }
}

export default new config();