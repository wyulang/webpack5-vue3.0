<template>
  <div>
    <span class="rel" ref="trigger">
      <slot></slot>
      <transition name="fade">
        <div @click.stop v-show="visible" :style="tipStyle" style="width:max-content" class="abs pt7 pb7 pl10 pr10 ra-4">
          <div :style="arrow" class="w-8 abs bc-0 h-8"></div>
          <slot name="content">
            {{content}}
          </slot>
        </div>
      </transition>
    </span>
  </div>
</template>

<script lang='ts'>
import { Vue, Prop, Ref } from 'vue-property-decorator';
export default class App extends Vue {
  @Prop({ type: String, default: '#fff' }) fcolor;
  @Prop({ type: String, default: '#303133' }) bcolor;
  @Prop({ type: String, default: 'bottom' }) placement;
  @Prop({ type: String, default: '提示！' }) content;
  @Prop({ type: String, default: '500px' }) maxWidth;
  @Prop({ type: Boolean, default: false }) click;
  @Ref('trigger') trigger;
  visible = false;
  position = { width: 0, heigth: 0 }

  get tipStyle() {
    let maxWidth = isNaN(this.maxWidth) ? (this.maxWidth + 'px') : this.maxWidth;
    let position = {}
    switch (this.placement) {
      case "bottom":
        position = { 'top': this.position.heigth + 10 + 'px', 'left': "50%", 'transform': "translateX(-50%)" }
        break;
      case "top":
        position = { 'bottom': this.position.heigth + 10 + 'px', 'left': "50%", 'transform': "translateX(-50%)" }
        break;
      case "left":
        position = { 'right': this.position.width + 10 + 'px', 'top': "50%", 'transform': "translateY(-50%)" }
        break;
      case "right":
        position = { 'left': this.position.width + 10 + 'px', 'top': "50%", 'transform': "translateY(-50%)" }
        break;
    }

    return {
      'background-color': this.bcolor,
      'color': this.fcolor,
      'max-width': maxWidth,
      ...position
    }
  }

  get arrow() {
    switch (this.placement) {
      case "bottom":
        return `left: 50%;top:-4px; transform:translateX(-50%) rotate(45deg);background-color:${this.bcolor}`;
        break;
      case "top":
        return `left: 50%;bottom:-4px; transform:translateX(-50%) rotate(45deg);background-color:${this.bcolor}`;
        break;
      case "left":
        return `top: 50%;right:-4px; transform:translateY(-50%) rotate(45deg);background-color:${this.bcolor}`;
        break;
      case "right":
        return `top: 50%;left:-4px; transform:translateY(-50%) rotate(45deg);background-color:${this.bcolor}`;
        break;
    }
    return "";
  }

  init() {
    this.position.width = this.trigger.offsetWidth;
    this.position.heigth = this.trigger.offsetHeight;
    if (this.trigger && !this.click) {
      if (this.content) {
        this.trigger.addEventListener('mouseover', e => {
          this.visible = true;
        })
        this.trigger.addEventListener('mouseleave', e => {
          this.visible = false;
        })
      }
    } else {
      this.trigger.addEventListener('click', this.btnShow)
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

  btnShow() {
    if (!this.content) return;
    this.visible = !this.visible;
    if (this.visible) {
      document.addEventListener("click", this.setSelectPop);
    }
  }

  mounted() {
    this.init();
  }

  updated() {
    this.init();
  }
}
</script>

<style lang='less'>
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