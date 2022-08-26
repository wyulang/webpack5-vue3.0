<template>
  <div class="drawer">
    <div :class="maskClass" @click="closeByMask"></div>
    <div :class="mainClass" :style="mainStyle" class="main flex fd-c">
      <div class="drawer-head ai-c">
        <span class="fb">{{ title }}</span>
        <slot name="btn"></slot>
      </div>
      <div :class="{'h-all auto':auto}" class="drawer-body rel flex-1">
        <slot />
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import { Vue, Prop, Model,Watch } from 'vue-property-decorator';
export default class App extends Vue {
  @Prop({ type: String, default: "标题" }) title;
  // 遮罩 开启，关闭
  @Prop({ type: Boolean, default: true }) mask;
  // 内容高度撑到div容器最高后 是否 显示滚动条
  @Prop({ type: Boolean, default: true }) auto;
  // 关闭事件
  @Prop({ type: Boolean, default: true }) maskClosable;
  @Prop({ type: String, default: "400px" }) width;
  // 某个元素内部显示
  @Prop({ type: Boolean, default: false }) inner;
  // 显示与关闭
  @Model('modelValue', { type: Boolean, default: false }) value!: boolean

  get maskClass() {
    return {
      'mask-show': (this.mask && this.value),
      'mask-hide': !(this.mask && this.value),
      'inner': this.inner
    }
  }

  get mainClass() {
    return {
      'main-show': this.value,
      'main-hide': !this.value,
      'inner': this.inner
    }
  }

  @Watch('value')
  changeValue() {
    if (this.value) {
      document.body.className = document.body.className + ' hideScrol';
    } else {
      document.body.className = document.body.className.replace(' hideScrol', "");
    }
  }

  get mainStyle() {
    let width = this.width;
    if (this.width.includes('%')) {
      width = this.width;
    } else if (!isNaN(this.width)) {
      width = this.width + 'px';
    }
    return {
      width: width,
      right: this.value ? '0' : `-${width}`,
      borderLeft: this.mask ? 'none' : '1px solid #eee'
    }
  }

  mounted() {
    if (this.inner) {
      let box = this.$el.parentNode
      box.style.position = 'relative'
    }
  }

  closeByMask() {
    this.maskClosable && this.$emit('update:modelValue', false)
  }

  closeByButton() {
    this.$emit('update:modelValue', false)
  }


}
</script>

<style lang='less'>
.hideScrol {
  height: 100vh;
  overflow: hidden;
}
.drawer {
  /* 遮罩 */
  .mask-show {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.3);
    opacity: 1;
    transition: opacity 0.2s;
    z-index: 8888;
  }
  .mask-hide {
    opacity: 0;
    transition: opacity 0.2s;
  }
  /* 滑块 */
  .main {
    position: fixed;
    z-index: 8889;
    top: 0;
    height: 100%;
    background: #fff;
    transition: all 0.2s;
    box-shadow: 0 8px 10px -5px rgba(0, 0, 0, 0.2),
      0 16px 24px 2px rgba(0, 0, 0, 0.14), 0 6px;
  }
  .main-show {
    opacity: 1;
  }
  .main-hide {
    opacity: 0.8;
  }
  /* 某个元素内部显示 */
  .inner {
    position: absolute;
  }
  /* 其他样式 */
  .drawer-head {
    display: flex;
    justify-content: space-between;
    padding: 10px;
    font-size: 14px;
    border-bottom: 1px solid #eee;
    .close-btn {
      display: inline-block;
      cursor: pointer;
      height: 100%;
      padding-left: 20px;
    }
  }
  .drawer-body {
  }
}
</style>