<template>
  <transition name="dialog">
    <section v-if="modelValue" :id="zindex" :style="{'z-index':zindex}" class="_dialog" ref='digBox'>
      <div v-if="isModel" @click="fullClose&&closeWin()" :style="{'z-index':zindex+1}" class="model"></div>
      <section :id="'dig'+(zindex+1)" ref='dialog' class="_dialog_body" :style='bodyStyle'>
        <!-- 头部 -->
        <div v-if="isHeader" id="fy-dialog" class="_dialog_title" data-type='move'>
          <span v-html="title"></span>
          <div @click.stop="closeWin">
            <span class="_diglog_close">✖</span>
          </div>
        </div>
        <!-- body -->
        <div class="_dialog_box">
          <slot></slot>
        </div>
        <!-- bottom -->
        <div class="_dialog_bottom">
          <slot name="footer"></slot>
        </div>
      </section>
    </section>
  </transition>
</template>

<script lang='ts'>
import { Vue, Prop, Model, Watch, Ref } from 'vue-property-decorator';
export default class dig extends Vue {
  @Prop({ default: true, type: Boolean }) fullClose;
  @Prop({ default: true, type: Boolean }) isHeader;
  @Prop({ default: true, type: Boolean }) isModel;//显示遮罩层？
  @Prop({ default: "300", type: [String, Number] }) width;
  @Prop({ default: "300", type: [String, Number] }) maxWidth;
  @Prop({ default: "100", type: [String, Number] }) minWidth;
  @Prop({ default: 100, type: [String, Number] }) height;
  @Prop({ default: '标题', type: String }) title;
  @Model('modelValue', { type: Boolean, default: false }) value!: boolean
  @Ref('dialog') dialog;

  startX: Number = 0;
  startY: Number = 0;
  oldTop: Number = 0;
  oldLeft: Number = 0;
  top: Number = 0;
  left: Number = 0;
  max: Boolean = false;
  zindex: Number = 1000;
  currWidth = 0;
  currHeight = 0;
  isFirst = true;

  get setWidth() {
    if (this.width.includes('%')) {
      return this.width;
    } else if (!isNaN(this.width)) {
      return this.width + 'px';
    }
    return this.width
  }

  get bodyStyle() {
    let width = this.width;
    if (!isNaN(this.width)) {
      width = this.width + 'px';
    }
    if (this.currWidth) {
      if (this.currWidth < Number(this.minWidth.replace(/[^\d]/g, ''))) {
        width = this.minWidth;
      } else {
        width = this.currWidth + 'px';
      }
    }
    let top = (document.documentElement.clientHeight - this.currHeight) / 3.5;
    let left = (document.documentElement.clientWidth - Number(width.replace(/[^\d]/g, ''))) / 2
    return {
      'width': width,
      'top': top + 'px',
      'left': left + 'px'
    }
  }

  startMove(e) { // 鼠标按下
    if (e.button === 0) { // 鼠标左键按下
      let id: any = 'dig' + (Number(this.zindex) + 1)
      let digs: any = document.getElementById(id);
      let x = e.pageX - digs.offsetLeft;  // 鼠标与窗口边框距离
      let y = e.pageY - digs.offsetTop;
      let maxW = window.innerWidth; // 最大拖动位置（不能拖离页面可视区）
      let maxH = window.innerHeight;
      document.onmousemove = (e) => { // 鼠标移动
        let loginX = e.pageX;
        let loginY = e.pageY;
        if (loginX < 0) loginX = 0;
        if (loginX > maxW) loginX = maxW;
        if (loginY < 0) loginY = 0;
        if (loginY > maxH) loginY = maxH;
        digs.style.left = loginX - x + 'px';
        digs.style.top = loginY - y + 'px';
      }
      document.onmouseup = (el) => {  // 鼠标抬起，清除鼠标移动事件
        document.onmousemove = null;
      }
    }
  }

  private closeWin() {
    this.isFirst = false;
    this.$emit('update:modelValue', false)
  }


  @Watch('modelValue')
  btnModel(newVal, oldVal) {
    let dig: any = document.getElementsByClassName('_dialog');
    let maxZindex: any = 1000;
    if (newVal) {
      if (dig.length) {
        for (let i = 0; i < dig.length; i++) {
          dig[i].children[0].style.display = "none";
          if (maxZindex < parseInt(dig[i].style.zIndex)) {
            maxZindex = parseInt(dig[i].style.zIndex);
          }
        }
      }
      if (this.zindex == 1000) {
        this.zindex = parseInt(maxZindex) + 1;
      }
    } else {
      if (dig.length > 1) {
        let ids: any = [];
        for (let i = 0; i < dig.length; i++) {
          dig[i].children[0].style.display = "none";
          ids.push({ id: parseInt(dig[i].id), index: i });
        }

        let item = ids.sort((a, b) => { return a.id - b.id })[ids.length - 2];
        dig[item.index].children[0].style.display = "";
      }
    }
  }

  updated() {
    if (this.$refs.dialog && this.value) {
      this.currWidth = (this.$refs.dialog as HTMLElement).offsetWidth;
      this.currHeight = (this.$refs.dialog as HTMLElement).offsetHeight;
      document.getElementById('fy-dialog')?.addEventListener('mousedown', this.startMove)
    }
  }
}
</script>

<style lang='less'>
._dialog {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  .model {
    width: 100%;
    height: 100%;
    opacity: 0.4;
    background-color: #000;
  }
  ._dialog_body {
    min-width: 240px;
    background: #fff;
    position: absolute;
    margin: 0 auto;
    border-radius: 5px;
    min-height: 30px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    ._dialog_title {
      height: 45px;
      cursor: move;
      align-items: center;
      user-select: none;
      width: 100%;
      background-color: #f2f2f2;
      border-top-left-radius: 5px;
      border-top-right-radius: 5px;
      display: flex;
      span {
        flex: 1;
        font-size: 15px;
        margin-left: 15px;
      }
      ._diglog_close {
        width: 33px;
        margin-right: 10px;
        cursor: pointer;
        font-size: 18px;
        padding: 10px 0;
      }
    }
    ._dialog_box {
      flex: 1;
      width: 100%;
    }
  }
}

.dialog-enter-active,
.dialog-leave-active {
  transition: all 0.2s;
}
.dialog-enter-active .dialog,
.dialog-leave-active .dialog {
  transition: all 0.2s;
}
.dialog-enter .dialog,
.dialog-leave-to .dialog {
  transform: scale3d(0.1, 0.1, 0.1);
}
.dialog-enter,
.dialog-leave-to {
  opacity: 0;
}
</style>