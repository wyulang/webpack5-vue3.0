/*!
 * vue-directive-valid 1.0.1
 * author 清水易寒
 * qq 595545402
 * Released under the MIT License.
 * use: v-valid:username="{rex:function OR 正则表达式,message:'提示语',model:'user.name v-model的参数'}"
 */

var _ = require('lodash/object');
import domTools from './dom-vue';
import Vue from 'vue';

class Verify {
  constructor() {
    domTools.addClass(document.body, '__valid_from');
  }
  regList = {
    imgcode: [/^[0-9a-zA-Z]{4}$/, '请输入正确的验证码'],
    smscoe: [/^\d{4,6}$/, '请输入正确的短信码'],
    postcode: [/^\d{4}$/, '请输入正确的邮政编码'],
    username: [/^[\w|\d]{2,26}$/, '请输入正确的用户名'],//用户名
    password: [/^(?=.*\d+)(?=.*[a-z]+)(?=.*[A-Z]+)(?=.*[^A-Za-z0-9\s]+)\S{6,16}$/, '请输入6位以上正确密码'],
    password6: [/^\S{6,16}$/, '请输入6位以上正确密码'],
    phone: [/^1[3|4|5|7|8]\d{9}$/, '请输入正确手机号'],
    realname: [/^[\u4e00-\u9fa5 ]{2,10}$/, '请输入真实姓名'],
    bank: [/^\d{10,19}$/, '请输入正确银行卡号'],
    money: [/^([1-9]\d*|0)$/, '请输入正确金额'],
    email: [/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/, '请输入正确邮箱'],
    idcode: [/^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/, '请输入正确的身份证']
  }
  init(vm) {
    Vue.util.defineReactive(vm, '$errors', {});
    Vue.util.defineReactive(vm, '$errorsArray', []);
    let that = this;
    Vue.directive('valid', {
      bind: function (el, binding, vnode) {
        let expression = null;
        if (vnode.data.model) {
          expression = vnode.data.model.expression;
        } else {
          if (vnode.data.directives.some(v => { return v.rawName == 'v-model' })) {
            expression = vnode.data.directives.find(v => { return v.rawName == 'v-model' }).expression
          }
        }
        !expression && binding.value && (expression = binding.value.model);
        // 获得提示语 先取placeholder
        let placeholder = vnode.data.attrs.placeholder || (vnode.componentOptions && vnode.componentOptions.propsData.placeholder) || '';
        // 如果 v-vaild:empty="{message:'不能为空'}" message里值优先用message提示语
        if (binding.value && binding.value.message) {
          placeholder = binding.value.message
        }
        _.set(vm.$errors, expression, { el: el, message: placeholder, type: binding.arg, rex: binding.value && binding.value.rex });
        !vm.$errorsArray.includes(expression) ? vm.$errorsArray.push(expression) : "";
      },
      update: function (el, binding, vnode) {
        let expression = null;
        if (vnode.data.model) {
          expression = vnode.data.model.expression;
        } else {
          if (vnode.data.directives.some(v => { return v.rawName == 'v-model' })) {
            expression = vnode.data.directives.find(v => { return v.rawName == 'v-model' }).expression
          }
        }
        !expression && binding.value && (expression = binding.value.model);
        that.clearCheck(binding.arg, _.get(vnode.context, expression), (binding.value && binding.value.rex), el)
      }
    });
  }
  // 清除样式
  clearCheck(type, value, rex, el) {
    let isCheck = false;
    if (rex) {
      if (typeof rex === "function") {
        let messge = rex && rex();
        if (typeof messge === "boolean" && boolean) {
          isCheck = true;
        }
        if (typeof messge === 'string' && !messge) {
          isCheck = true;
        }
      } else {
        if (rex.test(value)) {
          isCheck = true;
        }
      }
    }
    else if (type == 'array') {
      if (value && value.length > 0) {
        isCheck = true;
      }
    }
    else if (type == 'empty' && value) {
      isCheck = true;
    } else if (type != 'empty' && this.regList[type] && this.regList[type][0].test(value)) {
      isCheck = true;
    }
    if (isCheck) {
      domTools.removeClass(el, 'valid');
      domTools.removeClass(el, 'valid-input');
    }
  }

  // 验正 v-valid:empty="{message:'',res:/[^\d]/g}"
  check(vm, type) {
    let reValue = {
      isCheck: false,
      message: "",
      model: ''
    }
    console.log(vm.$errorsArray);
    for (let item of vm.$errorsArray) {
      if (item.includes(type) || !type) {
        reValue.model = item;
        let currValue = _.get(vm, item) || '';
        let currValid = _.get(vm.$errors, item);
        domTools.removeClass(currValid.el, 'valid');
        domTools.removeClass(currValid.el, 'valid-input');
        if (currValid.rex) {
          if (typeof currValid.rex === "function") {
            let messge = currValid.rex && currValid.rex();
            if (typeof messge === "boolean" && !boolean) {
              reValue.message = currValid.message;
              reValue.isCheck = true;
            }
            if (typeof messge === 'string' && messge) {
              reValue.message = messge;
              reValue.isCheck = true;
            }
          } else {
            if (!currValid.rex.test(currValue)) {
              reValue.message = currValid.message;
              reValue.isCheck = true;
            }
          }
        }
        else if (currValid.type == 'array') {
          if (!currValue || currValue.length == 0) {
            reValue.message = currValid.message;
            reValue.isCheck = true;
          }
        }
        else if (currValid.type == 'empty') {
          if (!currValue) {
            if (currValid.message) {
              reValue.message = currValid.message;
            }
            reValue.isCheck = true;
          }
        } else {
          if (this.regList[currValid.type] && !this.regList[currValid.type][0].test(currValue)) {
            reValue.message = this.regList[currValid.type][1];
            if (currValid.message) {
              reValue.message = currValid.message;
            }
            reValue.isCheck = true;
          }
        }

        if (reValue.isCheck) {
          if (!['INPUT', 'SELECT'].includes(currValid.el.tagName)) {
            domTools.addClass(currValid.el, 'valid');
          } else {
            domTools.addClass(currValid.el, 'valid-input');
          }
          break;
        }
      }
    }
    !reValue.message && (reValue.message = '请设置错误示语');
    return reValue;
  }
}
export default new Verify()
