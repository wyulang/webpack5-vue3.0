'use strict';
import baseApi from '@lib/baseApi';

class webapi extends baseApi {
  constructor() {
    super();
  }
  getEnvName() {
    let env = 'prod';
    let url = window.location.hostname;
    if (url.includes('localhost')) {
      env = "inte"
    } else if (url.includes('m.zy.86edu')) {
      env = 'inte';
    } else if (url.includes('zy.pc.86edu')) {
      env = 'inte';
    } else if (url.includes('zy.m.test')) {
      env = 'inte';
    }
    return env;
  }

  envUrl = {
    me: 'http://api.zytest.86edu.net',
    inte: 'http://api.zytest.86edu.net',
    // inte: 'https://api.zy.86edu.net',
    prod: 'https://api.zy.86edu.net',
  };

  joyred = {
    me: 'http://192.168.1.174:8185',
    inte: 'https://gaokaoquerytest.joyread.com.cn',
    prod: 'https://gaokaoquerytest.joyread.com.cn',
  }

  payUrl = {
    me: 'http://m.zy.86edu.net',
    inte: 'http://m.zy.86edu.net',
    prod: 'https://mzy.86edu.net',
  }

  loginServer = {
    me: 'http://api.zytest.86edu.net/api/app/person/info',
    inte: 'http://api.zytest.86edu.net/api/app/person/info',
    prod: 'https://api.zy.86edu.net/api/app/person/info',
  }

  isPro = window.location.protocol == 'https:' ? 'https:' : 'http:';

  interest = {
    me: this.isPro + '//api.interest.test.86edu.net',
    inte: this.isPro + '//api.interest.test.86edu.net',
    prod: this.isPro + '//api.interest.test.86edu.net',
  }

  getDomainApi() {
    return this.env('envUrl')
  }

  contentType(type) {
    if (type == 'json') {
      return "application/json"
    } else {
      return "application/x-www-form-urlencoded; charset=UTF-8"
    }
  }

  //请求体BUG提示
  getMessage(err, type) {

  }

  setToken(token) {
    let ts = this.storage('accesstoken');
    if (token) {
      ts = 'SUPER_ADMIN_TOKEN_FOR_GAOKAO';
    }
    return { accesstoken: ts }
  }

}

export default new webapi();