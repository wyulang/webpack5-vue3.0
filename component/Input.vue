<template>
  <div :class="fixClass" @mouseover="isHover=true" @mouseleave="isHover=false" class="rel _input">
    <span v-if="prefix" :class="prefix" class="iconfont abs al7 zi-120 abst"></span>
    <input :autocomplete="autocomplete" :maxlength="maxlength" :disabled="disabled" :readonly="readonly" @focus="onFocus" :placeholder="placeholder" @input="onInput" @blur="onBlur" v-model="value" :style="fixStyle" :class="inputClass" class="w-all ipt zi-110" :type="inputType">
    <span v-if="suffix&&!isHover&&!suftext" :class="suffix" class="iconfont abs ar7 zi-120 abst"></span>
    <span v-if="suftext&&!isHover" ref="suftext" class="iconfont fc-ccc fs-12 abs ar7 zi-120 abst">{{suftext}}</span>
    <svg style="fill:#ccc" v-if="isHover&&value" :class="{'ar25':type=='serch','ar7':type!='serch'}" @click.stop="onClear" class="abs iconfix hand close w-17 h-17 zi-120 abst" viewBox="0 0 1024 1024">
      <path
        d="M512 102.4a409.6 409.6 0 1 0 409.6 409.6 409.6 409.6 0 0 0-409.6-409.6z m181.248 518.144a51.2 51.2 0 0 1-72.704 72.704L512 584.192l-108.544 109.056a51.2 51.2 0 0 1-72.704-72.704L439.808 512 330.752 403.456a51.2 51.2 0 0 1 72.704-72.704L512 439.808l108.544-109.056a51.2 51.2 0 0 1 72.704 72.704L584.192 512z">
      </path>
    </svg>
    <svg style="fill:#ccc" v-if="!suffix&&type=='serch'" @click="onSerch" class="w-16 iconfix hand h-16 zi-120 abs ar7 abst" viewBox="0 0 1024 1024">
      <path
        d="M726.624149 462.055494c0-157.152203-123.57241-284.307208-276.247648-284.307208S174.128853 304.903292 174.128853 462.055494c0 156.705018 123.57241 283.859 276.247648 283.859S726.624149 618.760512 726.624149 462.055494zM864.523869 943.810656 696.178743 770.987542l-1.343601-1.790786c-66.711378 55.965639-151.779845 89.545432-244.459664 89.545432-213.56605 0-386.389164-177.748287-386.389164-396.686694 0-219.386616 172.823114-397.133879 386.389164-397.133879 213.117842 0 386.389164 177.748287 386.389164 397.133879 0 82.829474-25.073048 159.838382-67.159586 223.416396l5.372358 4.476965 168.345126 172.823114c21.490453 22.385846 21.490453 58.651818 0 81.038688C921.385924 965.749318 886.46253 965.749318 864.523869 943.810656z">
      </path>
    </svg>
  </div>
</template>

<script lang='ts'>
import { Vue, Prop, Model, Emit, Ref } from 'vue-property-decorator';
export default class App extends Vue {
  @Prop({ type: String, default: "text" }) type;
  @Prop({ type: String, default: "small" }) size;
  @Prop({ type: String, default: "" }) placeholder;
  //内容对齐方式 left, center, right
  @Prop({ type: String, default: "left" }) align;
  // 头部图标
  @Prop({ type: String, default: "" }) prefix;
  // 尾部图标
  @Prop({ type: String, default: "" }) suffix;
  // 尾部文本
  @Prop({ type: String, default: "" }) suftext;
  // input Class
  @Prop({ type: String, default: "" }) className;
  // 外部样式
  @Prop({ type: String, default: "w-all" }) class;
  @Prop({ type: String, default: "off" }) autocomplete;
  @Prop({ type: [String, Number], default: "off" }) maxlength;
  @Prop({ type: [Boolean], default: false }) readonly;
  @Prop({ type: [Boolean], default: false }) disabled;
  // 显示清空按钮
  @Prop({ type: Boolean, default: false }) clear;
  @Model('modelValue', { default: "" }) value: any;
  @Ref('suftext') sufText;

  isHover = false;
  suftextWidth = 0;

  get fixClass() {
    return this.class
  }

  get inputType() {
    if (this.type == 'serch') {
      return "text"
    } else {
      return this.type;
    }
  }

  get inputClass() {
    let mr = "";
    let ml = "";
    if (this.prefix) {
      ml = "prpre"
    }
    if (this.suffix) {
      mr = "prSuffix"
    }
    if (this.isHover) {
      mr = "prClear"
    }

    if (this.suftext && this.suftextWidth && !this.isHover) {
      mr = "prauto";
    }

    if (this.isHover && this.type == 'serch' && this.value) {
      mr = "prhc"
    }

    return {
      [ml]: ml,
      [mr]: mr,
      'ipt-small': this.size == 'small',
      'ipt-big': this.size == 'big',
      [this.className]: this.className
    }
  }

  get fixStyle() {
    if (this.suftextWidth) {
      return `padding-right:${this.suftextWidth}px !important;`
    }
    return ""
  }

  initData() {
    if (this.sufText) {
      this.suftextWidth = this.sufText.offsetWidth + 10;
    }
  }

  mounted() {
    this.initData();
  }

  updated() {
    this.initData();
  }

  onClear() {
    this.$emit('update:modelValue', "");
    this.onChange("")
    this.isHover = false;
  }

  onFocus(e) {
    this.isHover = true;
    if (this.type == 'serch') {
      this.$nextTick(() => {
        document.onkeydown = e => {
          var ev: any = document.all ? window.event : e;
          if (ev.keyCode == 13&&this.value) {
            this.onChange(this.value)
          }
        };
      });
    }
  }

  onSerch() {
    this.$emit('update:modelValue', this.value);
    this.onChange(this.value)
  }

  @Emit('input')
  onInput(v) {
    let { value } = v.target as HTMLInputElement
    return value
  }

  @Emit('blur')
  onBlur(v) {
    let { value } = v.target as HTMLInputElement
    return value
  }

  @Emit('change')
  onChange(v) {
    return v
  }

  // 鼠标经过
  onMouse(type) {
    if (type == 'move') {
      if (this.clear && this.value) {
        this.isHover = true;
      }
    } else {
      this.isHover = false;
    }
  }
}
</script>

<style lang='less'>
._input {
  .prClear {
    padding-right: 30px !important;
  }
  .prSuffix {
    padding-right: 30px !important;
  }
  .prpre {
    padding-left: 26px !important;
  }
  .prhc {
    padding-right: 45px !important;
  }
  .prauto {
    padding-right: auto;
  }
  .iconfix {
    &:hover {
      fill: #409eff !important;
    }
  }
}
</style>