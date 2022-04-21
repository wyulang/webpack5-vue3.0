<template>
  <div v-if="isRefel" :class="class" :style="{'height':`${options.inputHeight}px`}" class="_cascader rel">
    <div @click="onSelect" @mouseover="isHover=true" @mouseleave="isHover=false" class="rel w-all">
      <input ref="cascaderInput" :placeholder="placeholder" @focus="isHover=true" v-model="path" @blur="isHover=false" :disabled="disabled" :class="inputClass" class="w-all hand ipt" type="text">
      <svg style="transition: all 0.15s;" :class="{'arrow':visible}" class="abs ar5 drop abst w-22 h-22" viewBox="0 0 1024 1024">
        <path d="M346.453333 396.373333L512 561.92l165.546667-165.546667a42.496 42.496 0 1 1 60.16 60.16l-195.84 195.84a42.496 42.496 0 0 1-60.16 0L285.866667 456.533333a42.496 42.496 0 0 1 0-60.16c16.64-16.213333 43.946667-16.64 60.586666 0z" fill="#aaa"></path>
      </svg>
      <svg style="fill:#ccc" v-if="showClose" @click.stop="changeClose" class="abs ar23 iconfix hand close abst" viewBox="0 0 1024 1024" width="16" height="16">
        <path
          d="M512 102.4a409.6 409.6 0 1 0 409.6 409.6 409.6 409.6 0 0 0-409.6-409.6z m181.248 518.144a51.2 51.2 0 0 1-72.704 72.704L512 584.192l-108.544 109.056a51.2 51.2 0 0 1-72.704-72.704L439.808 512 330.752 403.456a51.2 51.2 0 0 1 72.704-72.704L512 439.808l108.544-109.056a51.2 51.2 0 0 1 72.704 72.704L584.192 512z">
        </path>
      </svg>
    </div>

    <div :style="currPosit" ref="nodes" class="zi-8888 bc-fff _dropdown pt5 pb5 ra5 flex-line abs al0 at5" @click.stop v-show="visible">
      <node @onNodeSelect="onNodeSelect" :check="check" :lazy="lazy" @setPosition="setPosition" v-model="value" :parm="parm" :expan="expan" :nodeValue="nodeValue" :data="nodeSelect"></node>
    </div>
  </div>
</template>

<script lang='ts'>
import { Vue, Prop, Model, Options, Emit, Ref } from 'vue-property-decorator';
import { isString, isArray, isObject } from '@lib/lang';
import node from './nodes.vue';
@Options({
  components: {
    node
  }
})
export default class App extends Vue {
  // 懒加载 return []
  @Prop({ type: Function }) lazy;
  // 输入框中是否显示选中值的完整路径
  @Prop({ type: Boolean, default: false }) only;
  // 是否显示单选框
  @Prop({ type: Boolean, default: false }) check;
  // 是否清空
  @Prop({ type: Boolean, default: false }) clear;
  // 是否禁用
  @Prop({ type: [String, Number, Boolean], default: false }) disabled;
  // 数据来原Array
  @Prop({ type: Array, default: [] }) data!: any;
  // 配置选项
  @Prop({ type: [Array, Object, String], default: ['label', 'value'] }) props;
  //当前已选中值最终值['01','0102','010203']
  @Model('modelValue', { default: "" }) value: any;
  // 外部样式
  @Prop({ type: String, default: "w-all" }) class;
  // Input样式
  @Prop({ type: String, default: "w-all" }) className;
  // 输入框占位文本
  @Prop({ type: String, default: "" }) placeholder;
  // 尺寸 small/big
  @Prop({ type: String, default: "small" }) size;
  // 当一个页面使多次使用时，可根据类型分别给值
  @Prop({ type: [String, Number, Boolean], default: "1" }) type;
  // 展开次数显示次数
  expan = 0;
  isHover = false;
  visible = false;

  isRefel = true;

  // 取值类型 1:初始化，2:正在点击取值，3:最终选中值
  loadType: any = 1;

  // 当前正在点击值
  nodeSelect: any = [];
  nodeValue: any = [];
  // 最终值
  valueSelect: any = [];
  digWidth = 0;

  options: any = {
    inputHeight: 0,
    digHeight: 0,
  }

  setPosition(v) {
    this.digWidth = v;
  }

  get showClose() {
    if (this.isHover && this.clear) {
      if (typeof this.value == "string") {
        return !!this.value
      } else {
        return this.value.length
      }
    }
    return false
  }

  onSelect() {
    if (this.disabled) return;
    if (this.visible) {
      this.visible = false;
    } else {
      this.visible = !this.visible;
    }
    this.expan = this.expan + 1;
    document.addEventListener("click", this.setSelectPop);
  }

  setSelectPop(e) {
    if (!this.$el.contains(e.target)) {
      this.visible = false;
      document.removeEventListener('click', this.setSelectPop)
    }
  }

  initSelect() {
    let inputs: any = this.$refs.cascaderInput;
    this.options.inputHeight = inputs.offsetHeight;

    this.options.digHeight = window.screen.height;
  }

  getElementLeft() {
    if (!this.$refs.cascaderInput) return { left: 0, top: 0 };
    let element: any = this.$refs.cascaderInput;
    var left = element.offsetLeft;
    var top = element.offsetTop;
    var current = element.offsetParent;

    while (current !== null) {
      left += current.offsetLeft;
      top += current.offsetTop;
      current = current.offsetParent;
    }
    return { left, top };
  }

  get currPosit() {
    let top = 0;
    if (this.visible) {
      top = this.$el.offsetTop + 214
    }
    let height = this.options.digHeight;
    let width = document.documentElement.clientWidth;

    let left = this.getElementLeft().left + this.digWidth;

    let style = "";
    if (left > width) {
      style = `left:-${left - width + 3}px;`;
    }
    if (top > height) {
      style += `top:-228px;`
    } else {
      style += `top:${this.options.inputHeight + 4}px`
    }
    return style;
  }

  mounted() {
    this.initSelect();
    if (!this.expan) {
      this.getInitData()
    }
  }

  updated() {
    this.initSelect()
  }

  get inputClass() {
    let mr = "mrclose";
    return {
      [mr]: mr,
      'ipt-small': this.size == 'small',
      'ipt-big': this.size == 'big',
      [this.className]: this.className
    }
  }

  get path() {
    if (!this.value.toString()) {
      if (this.expan == 0) {
        this.nodeSelect = [{
          label: "",
          value: "",
          list: this.data
        }];
      }
      return ""
    }

    let currValue = this.only ? String(this.valueSelect.map(v => v[this.parm.value]).reverse()[0]) : String(this.valueSelect.map(v => v[this.parm.value]));
    if (String(this.value) != currValue && this.isEnd && this.only) {
      this.isEnd = false;
    }
    if (this.loadType == 1 || String(this.value) != currValue) {
      // this.isEnd=false;
      if (this.only) {
        this.getOnlyPath(this.data)
      } else {
        this.getFullPath(this.data)
      }
    }
    this.nodeValue = this.nodeSelect.map(v => v[this.parm.value]);
    if (this.only) {
      let curr = this.valueSelect[this.valueSelect.length - 1];
      return curr && curr[this.parm.label] || ""
    } else {
      return this.valueSelect.map(v => v[this.parm.label]).join('/')
    }
  }

  getInitData() {
    if (this.lazy && this.value.length) {
      this.value.forEach((item, index) => {
        this.lazy(item).then(res => {
          let dal = {
            len: res.length,
            list: res,
            value: item,
            label: res.find(f => f[this.parm.value] == item)[this.parm.label]
          }
          this.nodeSelect[index] = Object.assign({}, dal);
          delete dal.list;
          this.valueSelect[index] = Object.assign({}, dal);
        })
      })
    }
  }

  onNodeSelect(data) {
    this.expan++;
    let children = data.children;
    let currData = Object.assign({}, data)
    delete currData.isNode
    delete currData.level
    delete currData.children;
    delete currData.lazy;
    let curr = this.nodeSelect[data.level];
    this.nodeSelect[data.level] = Object.assign(curr, currData);
    if (data.isNode) {
      this.loadType = 3;
      let sel: any = [].concat(this.nodeSelect).slice(0, data.level + 1);
      this.nodeSelect = JSON.parse(JSON.stringify(sel));
      this.valueSelect = JSON.parse(JSON.stringify(sel.map(v => { delete v.list; return v })));
      if (this.only) {
        let values = this.valueSelect[this.valueSelect.length - 1][this.parm.value];
        this.$emit('update:modelValue', values);
        this.changeNodeValue({ value: values, item: this.valueSelect[this.valueSelect.length - 1], type: this.type })
      } else {
        let values = this.valueSelect.map(v => v[this.parm.value]);
        this.$emit('update:modelValue', values);
        this.changeNodeValue({ value: values, item: this.valueSelect, type: this.type });
      }
    } else {
      this.loadType = 2;
      if (data.len) {
        if (!this.nodeSelect[data.level + 1]) {
          this.nodeSelect[data.level + 1] = {};
        }
        this.nodeSelect[data.level + 1].list = children;
      }
      // 异步加载修改上级数据
      if (children.length && data.lazy) {
        let modify = this.nodeSelect[data.level].list.find(v => v[this.parm.value] == data[this.parm.value]);
        modify.children = children;
        modify.len = children.length;
        modify = null;
      }
      let sel: any = this.nodeSelect.slice(0, data.level + 2);
      this.nodeSelect = sel;
      this.nodeValue = this.nodeSelect.map(v => v[this.parm.value]);
      sel = null;
      children = null;
      currData = null;
    }
  }

  // 完整路径值
  getFullPath(list: any = [], len = 0) {
    if (list.length && len < this.value.length) {
      let curr = list.find(v => v[this.parm.value] == this.value[len]);
      let child = [];
      let dal: any = {};
      if (curr) {
        dal = Object.assign({}, curr);
        child = curr[this.parm.child];
        dal.len = child && child.length || 0;
        dal.list = list;
        delete dal[this.parm.child]
      }
      this.nodeSelect[len] = Object.assign({}, dal);
      delete dal.list;
      this.valueSelect[len] = Object.assign({}, dal);
      if (dal.len) {
        this.getFullPath(child, len + 1)
      }
    }
  }

  // 单路径值
  onlyValue: any = [];
  isEnd = false;
  getOnlyPath(list: any = [], len = 0) {
    if (this.isEnd) return;
    let l = list.length;
    for (let i = 0; i < l; i++) {
      let item = list[i];
      item.len = item[this.parm.child] && item[this.parm.child].length || 0;
      item.list = list
      let curr = Object.assign({}, item);
      delete curr[this.parm.child]
      delete item.list
      this.onlyValue[len] = curr;
      curr = null;
      if (String(item[this.parm.value]) === String(this.value)) {
        let currList = this.onlyValue.slice(0, len + 1);
        this.nodeSelect = [];
        this.valueSelect = [];
        this.nodeSelect = JSON.parse(JSON.stringify([].concat(currList)));
        this.valueSelect = JSON.parse(JSON.stringify([].concat(currList.map(v => { delete v.list; return v }))));
        this.onlyValue = [];
        this.isEnd = true;
      } else {
        if (item[this.parm.child] && item[this.parm.child].length) {
          this.getOnlyPath(item[this.parm.child], len + 1)
        }
      }
    }
  }

  @Emit('change')
  changeNodeValue(data) {
    this.visible = false;
    return data
  }

  changeClose() {
    this.isHover = false;
    this.nodeSelect = [{
      label: "",
      value: "",
      list: this.data
    }];
    this.valueSelect = [];
    this.nodeValue = [];
    this.visible = false;
    this.changeNodeValue(this.only ? "" : [])
    this.$emit('update:modelValue', []);
  }

  get parm() {
    let label = "label";
    let value = "value";
    let child = "children";
    if (this.props) {
      if (isString(this.props)) {
        let obj = this.props.split(',');
        if (obj[0]) {
          label = obj[0];
        }
        if (obj[1]) {
          value = obj[1]
        }
        if (obj[2]) {
          child = obj[2]
        }
      } else if (isArray(this.props)) {
        if (this.props[0]) {
          label = this.props[0];
        }
        if (this.props[1]) {
          value = this.props[1]
        }
        if (this.props[2]) {
          child = this.props[2]
        }
      } else if (isObject(this.props)) {
        label = this.props.label;
        value = this.props.value;
        child = this.props.children;
      }
    }
    return { label, value, child }
  }

}
</script>

<style lang='less'>
._cascader {
  ._dropdown {
    border-radius: 4px;
    box-shadow: 0 1px 10px rgba(109, 109, 109, 0.2);
  }
  .arrow {
    transform: rotate(-180deg) translateY(50%);
  }
  .iconfix {
    &:hover {
      fill: #409eff !important;
    }
  }
  .mrdown {
    padding-right: 23px !important;
  }
  .mrclose {
    padding-right: 40px !important;
  }
  .cascader-item {
    &:hover {
      background-color: #f5f7fa;
    }
    .cascader-arrow {
      width: 8px;
      height: 8px;
      border-top: 1.4px solid #999;
      border-right: 1.4px solid #999;
      -webkit-transform: translate3d(0, -50%, 0) rotate(45deg);
      transform: translate3d(0, -50%, 0) rotate(45deg);
    }
  }
  .is-check {
    &:hover {
      .cascader-arrow {
        display: none;
      }
      .checks {
        display: inline-block;
        &:hover {
          border: #409eff 1.5px solid !important;
        }
      }
    }
  }
  .select-item {
    .cascader-arrow {
      border-top-color: #409eff !important;
      border-right-color: #409eff !important;
    }
    .cascader-titles {
      color: #409eff !important;
    }
  }
}
</style>