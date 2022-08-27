<template>
  <section :style="mainStyle" @mouseleave="onOut" @mousemove="onMove" class="h-all __scroll rel w-all">
    <main ref="main" @scroll="onScroll" class="scrollbar-contaniner h-all w-all">
      <slot></slot>
    </main>
    <transition name="scrollbar-fade">
      <section ref="instance" v-show="visible" @mousedown="clickTrackHandler" class="abs w-8 ar3 ab2 zi-100 ra-4 at2">
        <div ref="thumb" :style="thumbStyle" @mousedown="clickThumbHandler" class="rel w-all hand ra-4"></div>
      </section>
    </transition>
  </section>
</template>

<script lang='ts'>
import { Vue, Prop, Ref, Emit } from 'vue-property-decorator';
import { off, on } from '@lib/lang';
export default class App extends Vue {
  @Prop({ type: [String, Number], default: 0 }) width;
  @Prop({ type: [String, Number], default: "" }) maxHeight;
  @Prop({ type: [String, Number], default: "" }) height;
  // 指定滚动到指定位置
  @Prop({ type: [String, Number], default: "" }) auto;

  visible = false;

  parentHeight = 0;
  scrollHeight = 0;
  moveY = 0;

  @Ref('instance') instance;
  @Ref('thumb') thumb;
  @Ref('main') main;
  cursorDown = false;
  barStore = {};
  onselectstartStore: any = null;
  cursorLeave;

  bar = {
    offset: 'offsetHeight', scroll: 'scrollTop', scrollSize: 'scrollHeight',
    size: 'height', key: 'vertical', axis: 'Y', client: 'clientY', direction: 'top',
  }

  onMove(e) {
    if (this.thumbHeight) {
      this.visible = true
    } else {
      this.visible = false;
    }
  }

  onOut(e) {
    this.visible = false;
  }

  scrollTop(top = 1000) {
    this.$nextTick(() => {
      if (this.main) {
        this.main.scrollTop = this.main.scrollHeight + top;
      }
    })
  }

  clickTrackHandler(e) {
    const offset = Math.abs(e.target.getBoundingClientRect()[this.bar.direction] - e[this.bar.client])
    const thumbHalf = (this.thumb[this.bar.offset] / 2)
    const thumbPositionPercentage = ((offset - thumbHalf) * 100 / this.instance[this.bar.offset])

    this.main[this.bar.scroll] = (thumbPositionPercentage * this.main[this.bar.scrollSize] / 100)
  }

  clickThumbHandler(e) {
    e.stopPropagation()
    if (e.ctrlKey || [1, 2].includes(e.button)) {
      return
    }
    (document as any).getSelection().removeAllRanges()
    this.startDrag(e)
    this.barStore[this.bar.axis] = (e.currentTarget[this.bar.offset] - (e[this.bar.client] - e.currentTarget.getBoundingClientRect()[this.bar.direction]))
  }

  startDrag(e) {
    e.stopImmediatePropagation()
    this.cursorDown = true
    on(document, 'mousemove', this.mouseMoveDocumentHandler)
    on(document, 'mouseup', this.mouseUpDocumentHandler)
    this.onselectstartStore = document.onselectstart
    document.onselectstart = () => false
  }

  mouseMoveDocumentHandler(e) {
    if (this.cursorDown === false) return
    const prevPage = this.barStore[this.bar.axis]

    if (!prevPage) return

    const offset = ((this.instance.getBoundingClientRect()[this.bar.direction] - e[this.bar.client]) * -1)
    const thumbClickPosition = (this.thumb[this.bar.offset] - prevPage)
    const thumbPositionPercentage = ((offset - thumbClickPosition) * 100 / this.instance[this.bar.offset])

    this.main[this.bar.scroll] = (thumbPositionPercentage * this.main[this.bar.scrollSize] / 100)
  }

  mouseUpDocumentHandler() {
    this.cursorDown = false
    this.barStore[this.bar.axis] = 0
    off(document, 'mousemove', this.mouseMoveDocumentHandler)
    document.onselectstart = this.onselectstartStore
    if (this.cursorLeave) {
      this.visible = false
    }
  }

  // 滚动条高度
  get thumbHeight() {
    let scrollHeight = (this.parentHeight * 100) / this.scrollHeight;
    return scrollHeight < 100 ? scrollHeight + '%' : '';
  }

  // 滚动样式
  get thumbStyle() {
    let translate = `translateY(${this.moveY}%)`;
    return {
      'height': this.thumbHeight,
      'transform': translate,
      '-webkit-transform': translate,
      '-moz-transform': translate,
      'background-color': 'rgba(144,147,153,0.5)'
    }
  }

  get mainStyle() {
    if (this.height) {
      return {
        'height': this.height.toString().replace(/[^\d]/g, '') + 'px !important'
      }
    }
    if (this.maxHeight) {
      let currHeight = Number(String(this.maxHeight).replace(/[^\d]/g, ''));
      if (this.parentHeight < currHeight) {
        return ""
      }
      return {
        'height': currHeight + 'px !important'
      }
    }
    return "";
  }

  @Emit('scroll')
  changeScroll(value) {
    return value
  }

  // 是否滚动过
  runScroll = false;
  onScroll(e) {
    this.runScroll = true;
    // const offset = Math.abs(e.target.getBoundingClientRect().top - e.clientY)
    this.moveY = (e.srcElement.scrollTop * 100) / this.parentHeight;
    this.changeScroll({
      scrollTop: this.moveY,
      // 是否到最底部
      isBottom: (this.parentHeight + e.srcElement.scrollTop) > (this.scrollHeight - 2),
      // 是否到最顶部
      isTop: e.srcElement.scrollTop <= 0
    })
  }


  initScroll() {
    // 当有auto值时，且没有滚动过
    if (this.auto && !this.runScroll) {
      this.moveY = this.moveY = (this.auto * 100) / this.parentHeight;
      this.$refs.main.scrollTop = this.auto;
    }
  }

  mounted() {
    this.$nextTick(() => {
      this.parentHeight = this.$el.offsetHeight;
      this.scrollHeight = this.$refs.main.scrollHeight;
      this.initScroll();
    })
  }

  updated() {
    this.$nextTick(() => {
      // 当父级高度发生改变时
      if (this.$el.offsetHeight && this.parentHeight != this.$el.offsetHeight) {
        this.parentHeight = this.$el.offsetHeight
      }
      this.initScroll();
      // 当内容高度发生改变时
      if (this.$refs.main.scrollHeight && this.scrollHeight != this.$refs.main.scrollHeight) {
        this.scrollHeight = this.$refs.main.scrollHeight
      }
    })
  }
}
</script>

<style lang='less'>
.__scroll {
  .scrollbar-contaniner {
    scrollbar-width: none;
    -ms-overflow-style: none;
    overflow-x: hidden;
    overflow-y: scroll;
    &::-webkit-scrollbar {
      display: none;
    }
  }
  .scrollbar__thumb {
    transition: background-color 0.3s;
  }

  .scrollbar__thumb:hover {
    background-color: rgba(144, 147, 153, 0.5);
  }

  .scrollbar-fade-enter-active {
    transition: opacity 0.34s ease-out;
  }

  .scrollbar-fade-leave-active {
    transition: opacity 0.12s ease-out;
  }

  .scrollbar-fade-enter-from,
  .scrollbar-fade-leave-active {
    opacity: 0;
  }
}
</style>