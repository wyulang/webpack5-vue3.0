<template>
  <div :class="class" :style="{'height':`${options.inputHeight}px`}" class="rel _select">
    <div @click="onSelect" @mouseleave="btnMouse('leave')" @mousemove="btnMouse('move')" class="rel w-all">
      <input ref="selectInput" :readonly="isReadonly" @input="onInput" :placeholder="placeholder" :disabled="disabled" v-model="currValue.label" :class="inputClass" class="w-all hand ipt" type="text">
      <svg v-if="!isClear" style="transition: all 0.15s;" :class="{'arrow':visible}" class="abs ar5 drop abst w-22 h-22" viewBox="0 0 1024 1024">
        <path d="M346.453333 396.373333L512 561.92l165.546667-165.546667a42.496 42.496 0 1 1 60.16 60.16l-195.84 195.84a42.496 42.496 0 0 1-60.16 0L285.866667 456.533333a42.496 42.496 0 0 1 0-60.16c16.64-16.213333 43.946667-16.64 60.586666 0z" fill="#aaa"></path>
      </svg>
      <svg style="fill:#aaa" v-if="isClear" @click.stop="changeClose" class="abs w-18 h-18 ar5 hand iconfix close abst" viewBox="0 0 1024 1024">
        <path
          d="M512 102.4a409.6 409.6 0 1 0 409.6 409.6 409.6 409.6 0 0 0-409.6-409.6z m181.248 518.144a51.2 51.2 0 0 1-72.704 72.704L512 584.192l-108.544 109.056a51.2 51.2 0 0 1-72.704-72.704L439.808 512 330.752 403.456a51.2 51.2 0 0 1 72.704-72.704L512 439.808l108.544-109.056a51.2 51.2 0 0 1 72.704 72.704L584.192 512z">
        </path>
      </svg>
    </div>
    <transition name="select">
      <div :style="{'top':`${options.inputHeight+4}px`}" v-show="visible" class="_selects_dropdown abs zi-8888 ra-5 hidden ar0 al0">
        <scrollbar :auto="options.valueHeight" v-if="isRefresh" maxHeight="220">
          <div v-if="path.length" class="flex ra-5 hidden bc-fff w-all fd-c">
            <div :class="{'_is_select fb':currValue.value==item.value,'is_dis':(item.disabled&&currValue.value!=item.value)}" @click="selectItem(item)" v-for="(item,index) in path" class="hand h-34">
              <slot :item="item">
                <div :class="setStyle(item)" class="flex  h-all w-all pl15 ai-c">{{item.label}}</div>
              </slot>
            </div>
          </div>
          <div @click="visible=false" v-else class="flex hand h-40 ra-5 hidden bc-fff w-all ai-c jc-c">
            无数据
          </div>
        </scrollbar>
      </div>
    </transition>
  </div>
</template>

<script lang='ts'>
import { Vue, Prop, Model, Ref, Options, Emit } from 'vue-property-decorator';
import { isString, isArray, isObject } from '@lib/lang';
import scrollbar from './scroll.vue';
@Options({
  components: {
    scrollbar
  }
})
export default class App extends Vue {
  @Prop({ type: String, default: "w-all" }) class;
  @Prop({ type: String, default: "small" }) size;
  // 懒加载 return [] 输入查询
  @Prop({ type: Function }) lazy;
  // 显示清空选项
  @Prop({ type: Boolean, default: false }) clear;
  @Model('modelValue', { type: [String, Number, Boolean], default: "" }) value;
  @Prop({ type: String, default: "" }) placeholder;
  // 取值 props="name,id" 对应的是 label,value
  @Prop({ type: [String, Object, Array], default: "" }) props;
  // 禁用
  @Prop({ type: Boolean, default: false }) disabled;
  // list [{label:'',value}] -- [1,2]=>[{labe:1,value:1},{label:2,value:2}]
  @Prop({ type: Array, default: [] }) data!: any;
  // 当一个页面使多次使用时，可根据类型分别给值
  @Prop({ type: [String, Number, Boolean], default: "1" }) type;
  // 记录当前索引 vfor 里面的i
  @Prop({ type: Number, default: 0 }) index;
  @Ref('selectInput') selectInput;
  //禁用列表 禁用哪些值如:[1,2]
  @Prop({ type: Array }) exclude;
  isClear = false;
  visible = false;
  isOpen = false;
  isRefresh = true;
  list: any = [];
  lazyValue = "";
  isLazy = false;
  options: any = {
    inputHeight: 0,//输入框高度
    valueHeight: 0,//选中值高度
  }

  get currValue() {
    let item = this.path.find((v, i) => { return String(v.value) === String(this.value) });
    if (this.lazyValue && this.isLazy) {
      return { label: this.lazyValue, value: this.lazyValue }
    }
    if (item) {
      return item
    } else {
      return { label: "", value: "" }
    }
  }

  get isReadonly() {
    if (this.lazy) {
      return false;
    }
    return true
  }

  onInput(e) {
    let { value } = e.target as HTMLInputElement;
    this.lazyValue = value;
    this.$emit('update:modelValue', value);
    if (this.lazy && value) {
      this.lazy(value).then(res => {
        this.list = res;
        this.visible = true;
        this.isLazy = true;
        this.isRefresh = false;
        this.$nextTick(() => {
          this.isRefresh = true;
        })
      })
    } else {
      this.isRefresh = false;
      this.$nextTick(() => {
        this.isRefresh = true;
      })
    }
  }

  get path() {
    let list: any = [];
    let soure = (this.isLazy ? this.list : this.data) || []
    return soure.map(v => {
      let curr = {}
      if (typeof v !== 'object') {
        curr = { label: v, value: v }
      } else {
        curr = { ...v, label: v[this.parm.label], value: v[this.parm.value] }
      }
      return curr
    })
  }

  onRefresh() {
    this.isRefresh = false;
    this.isOpen = true;
    let index = this.path.findIndex(v => { return v.value == this.value });
    index = index ? (index - 3) : 0;
    index = index < 0 ? 0 : index;
    this.options.valueHeight = index * 34;
    this.$nextTick(() => {
      this.isRefresh = true;
    })
  }

  get parm() {
    let label = "label";
    let value = "value";
    if (this.props) {
      if (isString(this.props)) {
        let obj = this.props.split(',');
        if (obj[0]) {
          label = obj[0];
        }
        if (obj[1]) {
          value = obj[1]
        }
      } else if (isArray(this.props)) {
        if (this.props[0]) {
          label = this.props[0];
        }
        if (this.props[1]) {
          value = this.props[1]
        }
      } else if (isObject(this.props)) {
        label = this.props.label;
        value = this.props.value;
      }
    }
    return { label, value }
  }

  selectItem(item) {
    this.lazyValue = "";
    let curr = item.value;
    if (this.exclude && curr != String(this.value)) {
      if (this.exclude.some(v => String(item.value) == String(v))) {
        return;
      }
    }
    this.visible = false;
    this.$emit('update:modelValue', item.value);
    setTimeout(() => {
      this.handSelect(item);
      this.options.valueHeight = 0;
    }, 70);
    document.removeEventListener('click', this.setSelectPop)
  }

  @Emit('clear')
  changeClose() {
    this.isLazy=false;
    this.isClear = false;
    this.visible = false;
    this.$emit('update:modelValue', "");
    setTimeout(() => {
      this.handSelect({ label: "", value: "", clear: true });
    }, 50);
    return ""
  }

  btnClear() {
    if (this.clear) {
      this.changeClose()
    }
  }

  @Emit('change')
  handSelect(item) {
    return { value: item.value, item, index: this.index, type: this.type }
  }

  get inputClass() {
    return {
      'ipt-small': this.size == 'small',
      'ipt-big': this.size == 'big',
      'is-select': this.size == 'visible',
    }
  }

  setStyle(item) {
    let curr = item.value;
    if (this.exclude && curr != String(this.value)) {
      if (this.exclude.some(v => String(item.value) == String(v))) {
        return "is_dis"
      } else {
        return "_select_hover"
      }
    } else {
      return "_select_hover"
    }
  }

  initSelect() {
    this.options.inputHeight = this.selectInput.offsetHeight;
  }

  mounted() {
    this.initSelect();
  }

  updated() {
    this.isOpen = false;
    this.initSelect()
  }

  onSelect() {
    if (this.disabled) return;
    if (this.visible) {
      this.visible = false;
    } else {
      this.visible = !this.visible;
    }
    document.addEventListener("click", this.setSelectPop);
    if (!this.isOpen) {
      this.onRefresh();
    }
  }

  btnMouse(type) {
    if (type == 'move') {
      if (this.clear && String(this.value)) {
        this.isClear = true;
      }
    } else {
      this.isClear = false;
    }
  }

  setSelectPop(e) {
    if (!this.$el.contains(e.target)) {
      this.visible = false;
      document.removeEventListener('click', this.setSelectPop)
    }
  }

  beforeUnmount() {
    document.removeEventListener('click', this.setSelectPop);
  }
}
</script>

<style lang='less'>
._select {
  .arrow {
    transform: rotate(-180deg) translateY(50%);
  }
  .is-select {
    border-color: #57a3f3;
  }
  ._select_hover {
    &:hover {
      background-color: #f5f7fa;
      color: #409eff;
    }
  }
  .is_dis {
    color: #c0c4cc;
    cursor: not-allowed;
  }
  ._is_select {
    color: #409eff;
  }
  ._selects_dropdown {
    box-sizing: border-box;
    border-radius: 4px;
    box-shadow: 0 1px 10px rgba(109, 109, 109, 0.2);
  }

  .select-enter-active,
  .select-leave-active {
    transition: all 0.4s;
    opacity: 1;
    transform: scaleY(1);
  }
  .select-enter,
  .select-leave-to {
    opacity: 0;
    transform: scaleY(0.5);
    transition: transform 0.3s cubic-bezier(0.23, 1, 0.32, 1),
      opacity 0.3s cubic-bezier(0.23, 1, 0.32, 1);
    transform-origin: center top;
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
    transform-style: preserve-3d;
  }

  .iconfix {
    &:hover {
      fill: #409eff !important;
    }
  }
}
</style>