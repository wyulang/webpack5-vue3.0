<template>
  <div :class="{'errors':show}" class="w-all rel">
    <slot></slot>
    <p @click.stop class="fs-12 pl2">
      {{remark}}-{{value}}-{{visible}}
    </p>
  </div>
</template>

<script lang='ts'>
import { Vue, Prop, Model, Watch } from 'vue-property-decorator';
export default class App extends Vue {
  @Prop({ type: String, default: '' }) rex;
  // 验正类型如 number,idcard,phone,empty
  @Prop({ type: String, default: '' }) value;
  // 验正类型如 
  @Prop({ type: String, default: '' }) placeholder;
  @Model('modelValue', { type: Object, default: { check: false, message: [] } }) error;
  visible = false;
  currHolder = "";
  currlist = [];
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
  get remark() {
    this.visible = false;
    let message = "";
    if (this.rex) {
      console.log('=====================')
      if (typeof this.rex === "function") {
        message = rex && rex();
        if (typeof messge === "boolean" && boolean) {
          this.visible = true;
        } else if (typeof messge === 'string' && !messge) {
          this.currHolder = message;
          this.visible = true;
        }
      } else if (typeof this.rex === "string") {
        if (this.rex == 'empty' && !String(this.value)) {
          this.visible = true;
        } else if (typeof this.rex === "array" && !this.value.length) {
          this.visible = true;
        } else if (this.regList[this.rex]) {
          let rex = this.regList[this.rex];
          if (!rex[0].test(this.value)) {
            this.visible = true;
            this.currHolder = rex[1];
          }
        }
      } else if (typeof this.rex === 'object') {
        if (this.rex.test(value)) {
          this.visible = true;
        }
      }
    }
    return this.currHolder
  }

  @Watch('currHolder')
  changeHolder() {
    if (!this.error.message.some(v => this.currlist.some(s => s == v))) {
      let curr = this.error;
      this.currHolder && curr.message.push(this.currHolder);
      this.$emit('update:modelValue', curr);
      curr = null;
    } else {
      this.currlist.push(this.currHolder)
    }
  }

  @Watch('visible')
  changeVisible() {
    if (!this.visible) {
      let curr = this.error;
      curr.message = curr.message.filter(v => !this.currlist.some(s => s == v));
      this.$emit('update:modelValue', curr);
      curr = null;
    } else {
      if (!this.error.message.some(v => this.currlist.some(s => s == v))) {
        let curr = this.error;
        this.currHolder && curr.message.push(this.currHolder);
        this.$emit('update:modelValue', curr);
        curr = null;
      }
    }
  }

  get show() {
    return this.visible && this.error.isVaild;
  }

  mounted() {
    if (this.placeholder) {
      this.currHolder = this.placeholder
    } else if (this.$el.querySelector('[placeholder]')) {
      this.currHolder = this.$el.querySelector('[placeholder]').getAttribute('placeholder')
    }
    this.currHolder && this.currlist.push(this.currHolder)
  }
}
</script>

<style lang='less'>
.errors {
  // background-color: #fef0f0;
  // border: 1px solid #fde2e2;
  p {
    color: #f56c6c;
  }
  input,
  textarea {
    border: 1px solid #f56c6c;
  }
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>