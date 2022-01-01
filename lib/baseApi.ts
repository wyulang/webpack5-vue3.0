import axios from 'axios'
const queryString = require('query-string');
class webapi {
  constructor() {

  }

  getEnvName() {
    return "inte"
  }

  contentType(type = '') {
    // type ? "application/x-www-form-urlencoded; charset=UTF-8" : "application/json"
    return type ? type : "application/json";
  }

  getMessage(res: any, type: any) {
    //show message error
  }

  // 设置全局属性
  setData(data: any = null) {
    return {}
  }

  setWithCredentials() {
    return false
  }

  env(key: string, envName: string = "") {
    envName = envName || this.getEnvName() || 'prod';
    return this[key] && this[key][envName] || undefined;
  }

  setToken(type: any) {
    return {}
  }

  storage(key: any, value: any = "", type: any = "") {
    if (type) {
      localStorage.removeItem(key);
      return;
    } else {
      if (!!value) {
        return localStorage.setItem(key, JSON.stringify(value));
      } else {
        let val = localStorage.getItem(key) || "";
        return (val && JSON.parse(val)) || "";
      }
    }
  }

  getDomainApi() {
    return ""
  }

  // axiosConfig={
  //   isUrl:"全址：http://www.baidu.com",
  //   header:'multipart/form-data;',
  //   responseType:"json,blob,text",
  //   withCredentials:false,
  //   Url:'http://www.baidu.com/+url=>xxx/xxx',
  //   qs:'fromData 要求传json参数'
  // }
  config(route: string, data: any = undefined, method: string, axiosConfig: object = {}) {
    let url: string = this.getDomainApi().concat(route);
    let header: string = "";
    let responseType: string = "json";//"json,blob..."
    let withCredentials: string = '';
    let isQs: string = '';//为空为false
    Object.keys(axiosConfig).forEach(v => {
      if (v == "isUrl") {
        url = route;
      } else if (v == "header") {
        header = axiosConfig[v];
      } else if (v == "responseType") {
        responseType = axiosConfig[v];
      } else if (v == "withCredentials") {
        withCredentials = axiosConfig[v]
      } else if (v == 'Url') {
        url = axiosConfig[v].concat(url);
      } else if (v == 'qs') {
        isQs = axiosConfig[v]
      }
    })
    return this.request(url, data, method, header, responseType, withCredentials, isQs)
  }

  getHeader(header: any) {
    let ctype = this.contentType(header.type || header);
    let tokenType = header.token || '';
    let headerObj = {
      'Content-Type': ctype
    }
    if (typeof header === 'object') {
      let cbHeader = {};
      Object.keys(header).forEach(v => {
        // 排除不需要的参数
        if (!['type', 'token'].includes(v)) {
          cbHeader[v] = header[v];
        }
      })
      Object.assign(headerObj, cbHeader);
    }
    let token = this.setToken(tokenType);
    Object.assign(headerObj, token);
    return headerObj;
  }

  request(url: string, data: any = undefined, method: string, header: any, responseType: string = "json", withCredentials: string = "", isQs: string = "") {
    let isSession = false;
    let headers = this.getHeader(header);
    let params = ['get'].includes(method) ? "params" : "data";
    if (withCredentials != '') {
      if (withCredentials == 'true') {
        isSession = true;
      }
      if (withCredentials == 'false') {
        isSession = false;
      }
    } else {
      isSession = this.setWithCredentials();
    }
    let gData = this.setData(data);
    data = Object.assign(gData, data);
    if (headers["Content-Type"].includes('urlencoded') && !['get'].includes(method)) {
      if (!isQs) {
        data = queryString.stringify(data);
      }
    } else if (headers["Content-Type"].includes('multipart')) {
      let formData = new FormData();
      if (Object.keys(data).length > 0) {
        Object.keys(data).forEach(v => {
          formData.append(v, data[v])
        })
        data = formData;
      }
    }

    let soucrs: object = {
      url: url,
      method: method,
      headers: headers,
      [params]: data,
      responseType: responseType,
      withCredentials: isSession
    }
    // debugger;
    // if (Object.keys(data || {}).length > 0) {
    //   soucrs[params] = data;
    // }
    return axios.request(soucrs).catch(res => {
      if (!res.response) {
        this.getMessage({ code: 404, data: "服务异常 " + res.message }, 'catch');
        return { code: 404 }
      }
      else if (res.response.status != 200) {
        this.getMessage({ code: res.response.status, data: res.response.data }, 'catch');
        return { code: res.response.status, data: res.response.data }
      } else {
        this.getMessage(res, 'catch');
      }
    }).then(res => {
      let result: any = res
      if (result.request && result.request.responseType && result.request.responseType == "blob") {
        return res
      }
      this.getMessage(res, 'then');
      if (result?.data && result?.data.code) {
        return result.data;
      } else {
        return { code: result?.status, data: res?.data };
      }
    })

  }

  get(url, data: any = undefined, config = {}) {
    return this.config(url, data, 'get', config)
  }
  post(url, data: any = undefined, config = {}) {
    return this.config(url, data, 'post', config);
  }
  put(url, data: any = undefined, config = {}) {
    return this.config(url, data, 'PUT', config);
  }
  delete(url, data: any = undefined, config = {}) {
    return this.config(url, data, 'delete', config)
  }
}
export default webapi;