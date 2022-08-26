<template>
  <transition class="DIALOGFAG" name="dialog">
    <section v-if="value" :id="currIndex" :style="{'z-index':currIndex}" class="fixed at0 al0 ab0 ar0">
      <section ref="digModel" v-if="isModel" @click="closeWin" :style="{'z-index':currIndex}" class="zi-100 dialog__overlay flex ba-4 w-all h-all"></section>
      <section ref="main" :style="bodyStyle" class="zi-120 bc-fff dialog__content sha-card flex-line fd-c abs wi-250 ra-3 m-auto">
        <!-- 头部 -->
        <div ref="hearder" style="cursor: move;border-top-left-radius: 3px;border-top-right-radius: 3px;" class="noselect ai-c pl10 jc-b flex w-all bc-f2 h-45">
          <span class="fs-15" v-html="title"></span>
          <span @click.stop="closeWin" class="hand fc-888 fs-18 pp10">✖</span>
        </div>
        <!-- 内容 -->
        <div ref="bodys" class="flex-1 w-all">
          <slot></slot>
        </div>
        <!-- 底部 -->
        <slot name="footer"></slot>
      </section>
    </section>
  </transition>
</template>

<script lang='ts'>
import { Vue, Prop, Model, Watch } from 'vue-property-decorator';
export default class App extends Vue {
  // 内容区以外是否可以点击关闭
  @Prop({ default: true, type: Boolean }) fullClose;
  // 是否显示标题头
  @Prop({ default: true, type: Boolean }) isHeader;
  //显示遮罩层？
  @Prop({ default: true, type: Boolean }) isModel;
  // 宽度
  @Prop({ default: "", type: [String, Number] }) width;
  // 高度
  @Prop({ default: 9000, type: [String, Number] }) zindex;
  // 标题可以是html 如<span class='red'>标题</span>
  @Prop({ default: '标题', type: String }) title;
  // 显示/关闭
  @Model('modelValue', { type: Boolean, default: false }) value!: boolean

  isMove = false;
  currIndex = 0;
  mWidth = 0;
  mHeight = 0;

  initDig() {
    this.mWidth = this.$refs.main && this.$refs.main.offsetWidth || 0;
    this.mHeight = this.$refs.main && this.$refs.main.offsetHeight || 0;
    this.setDigIndex();
    if (this.value) {
      this.$refs.hearder.addEventListener('mousedown', e => {
        if (e.button === 0) { // 鼠标左键按下
          let x = e.pageX - this.$refs.main.offsetLeft;  // 鼠标与窗口边框距离
          let y = e.pageY - this.$refs.main.offsetTop;
          let maxW = window.innerWidth; // 最大拖动位置（不能拖离页面可视区）
          let maxH = window.innerHeight;
          document.onmousemove = (e) => { // 鼠标移动
            let loginX = e.pageX;
            let loginY = e.pageY;
            if (loginX < 0) loginX = 0;
            if (loginX > maxW) loginX = maxW;
            if (loginY < 0) loginY = 0;
            if (loginY > maxH) loginY = maxH;
            this.$refs.main.style.left = loginX - x + 'px';
            this.$refs.main.style.top = loginY - y + 'px';
          }
          document.onmouseup = (el) => {  // 鼠标抬起，清除鼠标移动事件
            document.onmousemove = null;
          }
        }
      })
    }
  }

  get bodyStyle() {
    let mwidth = this.mWidth;
    if (this.width) {
      if (this.width.includes('%')) {
        mwidth = document.documentElement.clientWidth * (Number(this.width.replace(/[^\d]/g, "")) / 100)
      } else {
        mwidth = this.width.replace(/[^\d]/g, '');
      }
    }
    if (mwidth < 250) {
      mwidth = 250;
    }
    let left = document.documentElement.clientWidth / 2 - Number(mwidth) / 2;
    let top = document.documentElement.clientHeight / 2 - Number(this.mHeight) / 2;
    if (this.width) {
      return {
        'width': mwidth + 'px',
        'top': top * 0.65 + 'px',
        'left': left + 'px'
      }
    }
    return {
      'top': top * 0.65 + 'px',
      'left': left + 'px'
    }
  }

  setDigIndex() {
    let dig: any = document.getElementsByClassName('DIALOGFAG');
    let maxZindex: any = this.zindex;
    if (this.value) {
      if (dig.length) {
        for (let i = 0; i < dig.length; i++) {
          dig[i].children[0].style.display = "none";
          if (maxZindex < parseInt(dig[i].style.zIndex)) {
            maxZindex = parseInt(dig[i].style.zIndex);
          }
        }
      }
      if (!this.currIndex) {
        this.currIndex = parseInt(maxZindex) + 1;
      }
      this.$refs.digModel.style.display = "";
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

  private closeWin() {
    this.$emit('update:modelValue', false)
  }

  @Watch('value')
  changeValue() {
    if (this.value) {
      document.body.className = document.body.className + ' hideScrol';
    } else {
      document.body.className = document.body.className.replace(' hideScrol', "");
    }
    this.$nextTick(() => {
      this.initDig();
    })
  }

  updated() {

  }
}
</script>

<style lang='less'>
.hideScrol {
  height: 100vh;
  overflow: hidden;
}

.dialog-enter-active{
  
}
.dialog-leave-active {
  transition: all 0.2s;
}
.dialog-enter-active .dialog__content{

}
.dialog-leave-active .dialog__content {
  top:0;
  left: 0;
  transition: all 0.2s;
}
.dialog-enter .dialog__content,
.dialog-leave-to .dialog__content {
  transform: scale3d(0.1, 0.1, 0.1);
}
.dialog-enter,
.dialog-leave-to {
  opacity: 0;
}
</style>