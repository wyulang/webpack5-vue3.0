<template>
  <transition v-if="['success', 'warning', 'info', 'error','phone'].includes(type)" name="anmessage" @before-leave="onClose" @after-leave="destroy">
    <section :style="messageStype" :class="messageClass" @mouseenter="clearTimer" @mouseleave="startTimer" v-show="visible">
      <svg v-if="type!='phone'&&!icon" class="w-18 h-18 mr10" viewBox="0 0 1024 1024">
        <path :d="curricon[type]"></path>
      </svg>
      <span v-if="icon" class="iconfont mr10 icon"></span>
      <div v-html="message"></div>
    </section>
  </transition>

  <section v-else class="fixed al0 at0 flex ai-c jc-c zi-8888 ar0 ab0 ba-2">
    <transition name="anmessage">
      <div :class="{'wb-70':isPhone,'wa-420 mb100':!isPhone}" class="bc-fff wi-300 sha-card ra-4">
        <!-- header -->
        <div class="flex ai-c pl15 pr10 pt10 jc-b">
          <span v-html="title" class="fs-18"></span>
          <svg @click="btnSave('close')" style="fill:#888" class="w-20 h-20 hand" viewBox="0 0 1024 1024">
            <path
              d="M263.914057 205.1072c14.818743 0 29.564343 5.632 40.813714 16.866743l207.6672 206.877257 206.877258-206.877257a57.519543 57.519543 0 0 1 40.828342-16.852114c14.979657 0 30.032457 5.763657 41.530515 17.261714 22.864457 22.849829 23.025371 59.713829 0.394971 82.358857L595.163429 511.605029l206.877257 207.6672c22.6304 22.6304 22.454857 59.509029-0.380343 82.373485a58.587429 58.587429 0 0 1-41.530514 17.232457 57.5488 57.5488 0 0 1-40.842972-16.852114L512.394971 594.358857 304.727771 802.011429a57.461029 57.461029 0 0 1-40.828342 16.881371 58.660571 58.660571 0 0 1-41.530515-17.261714c-22.864457-22.864457-23.025371-59.743086-0.394971-82.373486l207.681828-207.6672-207.681828-206.862629c-22.6304-22.6304-22.4256-59.509029 0.394971-82.358857a58.631314 58.631314 0 0 1 41.545143-17.261714m0-58.514286a116.501943 116.501943 0 0 0-82.900114 34.391772c-45.641143 45.655771-45.816686 119.734857-0.4096 165.112685l166.224457 165.5808-166.224457 166.1952c-45.421714 45.450971-45.231543 119.544686 0.4096 165.141943a116.384914 116.384914 0 0 0 82.885486 34.4064 115.419429 115.419429 0 0 0 82.212571-34.026057l166.209829-166.1952 165.493028 166.107429a115.580343 115.580343 0 0 0 82.300343 34.084571c31.275886 0 60.708571-12.200229 82.885486-34.377143 45.641143-45.655771 45.816686-119.720229 0.394971-165.112685L677.829486 511.678171 843.395657 346.112c45.407086-45.436343 45.231543-119.515429-0.4096-165.112686a116.370286 116.370286 0 0 0-82.885486-34.391771 115.477943 115.477943 0 0 0-82.183314 33.982171l-165.595428 165.5808L346.024229 180.516571a115.419429 115.419429 0 0 0-82.110172-33.923657z">
            </path>
            <path
              d="M741.668571 317.6448a14.613943 14.613943 0 0 1-10.3424-24.970971l31.0272-31.0272a14.613943 14.613943 0 1 1 20.6848 20.6848l-31.0272 31.0272a14.526171 14.526171 0 0 1-10.3424 4.286171zM596.860343 462.467657a14.613943 14.613943 0 0 1-10.3424-24.970971l103.424-103.424a14.613943 14.613943 0 1 1 20.6848 20.6848l-103.424 103.424a14.584686 14.584686 0 0 1-10.3424 4.286171z">
            </path>
          </svg>
        </div>

        <!-- body -->
        <div class="w-all pt15 pl15 pr15 pb15 fs-14 fc-666 lh-24">
          <input :class="{'mb5':!popValid}" :placeholder="placeholder" v-model="popValue" v-if="type=='pop'" class="w-all ipt ipt-big fs-14 pp10 b-d h-35 mt5 ra-4" type="text">
          <div v-else class="flex">
            <span v-if="icon" :class="icon" class="iconfont mr10"></span>
            <p v-html="message"></p>
          </div>
          <span class="red fs-12" v-if="popValid">*{{popMsg}}</span>
        </div>

        <!-- bottom -->
        <div class="w-all pl15 pr12 pb10 flex ai-c jc-e">
          <div @click="btnSave('cancel')" class="btn-default btn-min ra-3">{{cancelButtonText}}</div>
          <div @click="btnSave(type=='pop'?'pop':'ok')" class="btn-primary btn-min ml10 ra-3">{{confirmButtonText}}</div>
        </div>
      </div>
    </transition>
  </section>

</template>

<script lang='ts'>
import { Vue, Prop } from 'vue-property-decorator';
export default class App extends Vue {
  // 'success', 'warning', 'info', 'error', 'confirm', 'pop','phone' 类型
  @Prop({ type: String, default: 'success' }) type;
  // 内容
  @Prop({ type: String, default: '' }) message;
  @Prop({ type: String, default: "" }) placeholder;
  // 内容
  @Prop({ type: String, default: '' }) className;
  // message 位置 bottom，top，left，right
  @Prop({ type: String, default: 'top' }) placement;
  // 图标
  @Prop({ type: String, default: '' }) icon;
  // z-index
  @Prop({ type: Number, default: 8888 }) zindex;
  // top高度
  @Prop({ type: Number, default: 10 }) offset;
  // 取消铵钮文案
  @Prop({ type: String, default: '取消' }) cancelButtonText;
  // 确定铵钮文案
  @Prop({ type: String, default: '确定' }) confirmButtonText;
  // 弹框ID auto
  @Prop({ type: String, default: '' }) id;
  // 弹框标题
  @Prop({ type: String, default: '提示' }) title;
  // pop输入框验正文案
  @Prop({ type: String, default: '内容不为空' }) popMsg;
  // 显示时长
  @Prop({ type: Number, default: 3000 }) time;
  // 弹框关闭事件
  @Prop({ type: Function }) close;
  // 关闭 
  @Prop({ type: Function }) onClose;
  // 消毁当前dom接点事件
  @Prop({ type: Function }) destroy;

  curricon = {
    error: 'M512 0C229.23 0 0 229.23 0 512s229.23 512 512 512 512-229.23 512-512S794.77 0 512 0z m169.71 568.57a80 80 0 0 1-113.14 113.14L512 625.14l-56.57 56.57a80 80 0 1 1-113.14-113.14L398.86 512l-56.57-56.57a80 80 0 1 1 113.14-113.14L512 398.86l56.57-56.57a80 80 0 1 1 113.14 113.14L625.14 512z',
    success: 'M824.32 217.6c-194.56 124.928-335.872 281.6-399.36 360.96L269.312 451.072 200.704 508.928l268.288 285.184c46.592-123.392 193.024-365.056 371.712-536.576l-16.384-39.936zM512 1024C229.376 1024 0 794.624 0 512S229.376 0 512 0s512 229.376 512 512-229.376 512-512 512z',
    warning: 'M512 0C229.205333 0 0 229.205333 0 512s229.205333 512 512 512 512-229.205333 512-512S794.794667 0 512 0z m0 796.458667A56.917333 56.917333 0 1 1 511.957333 682.666667 56.917333 56.917333 0 0 1 512 796.458667z m54.186667-227.797334h0.128a60.501333 60.501333 0 0 1-53.802667 55.893334c2.048 0.256 3.882667 1.152 5.973333 1.152h-11.818666c2.048 0 3.84-0.981333 5.845333-1.109334a59.093333 59.093333 0 0 1-53.162667-55.893333l-13.056-284.16a54.314667 54.314667 0 0 1 54.613334-57.045333h26.282666a52.992 52.992 0 0 1 54.186667 57.002666l-15.146667 284.16z',
    info: "M512 53.248c129.707008 3.412992 237.739008 48.299008 324.096 134.656S967.339008 382.292992 970.752 512c-3.412992 129.707008-48.299008 237.739008-134.656 324.096S641.707008 967.339008 512 970.752c-129.707008-3.412992-237.739008-48.299008-324.096-134.656S56.660992 641.707008 53.248 512c3.412992-129.707008 48.299008-237.739008 134.656-324.096S382.292992 56.660992 512 53.248z m68.608 281.6c17.748992 0 32.427008-5.291008 44.032-15.872 11.604992-10.580992 17.408-24.747008 17.408-42.496s-5.803008-31.915008-17.408-42.496c-11.604992-10.580992-26.112-15.872-43.52-15.872s-31.915008 5.291008-43.52 15.872c-11.604992 10.580992-17.408 24.747008-17.408 42.496s5.803008 31.915008 17.408 42.496c11.604992 10.580992 25.940992 15.872 43.008 15.872z m12.288 368.64c0-4.096 0.340992-9.556992 1.024-16.384s0.683008-13.312 0-19.456l-54.272 62.464c-5.460992 6.144-11.092992 10.923008-16.896 14.336s-10.752 4.436992-14.848 3.072c-6.144-2.731008-8.875008-7.508992-8.192-14.336l90.112-283.648c3.412992-19.115008 0.340992-35.499008-9.216-49.152-9.556992-13.652992-24.916992-21.844992-46.08-24.576-23.892992 0.683008-50.004992 10.752-78.336 30.208S403.115008 450.219008 381.952 480.256v15.36c-0.683008 6.827008-0.683008 13.312 0 19.456l54.272-62.464c5.460992-6.144 11.092992-10.923008 16.896-14.336s10.411008-4.436992 13.824-3.072c6.827008 3.412992 9.216 8.875008 7.168 16.384l-89.088 282.624c-4.779008 17.067008-2.388992 32.256 7.168 45.568s26.283008 22.356992 50.176 27.136c34.132992-0.683008 62.804992-10.580992 86.016-29.696s44.715008-43.691008 64.512-73.728z"
  }

  // 手机端
  isPhone = /(iPhone|iOS|Android)/i.test(navigator.userAgent);
  popValue = "";
  timer: any;
  visible = true;
  popValid = false;

  get isMessage() {
    if (this.type == 'phone') {
      return 1
    } else if (['success', 'warning', 'info', 'error'].includes(this.type)) {
      return 2
    } else if (this.type == 'confirm') {
      return 3
    } else if (this.type == 'pop') {
      return 4
    }
  }

  get messageClass() {
    return {
      'fixed flex-line ai-c abs pl12 pr12 lh-22 pt6 pb6 bc-fff ra-4': true,
      [this.className]: this.className,
      'success': this.type == 'success',
      'warning': this.type == 'warning',
      'info': this.type == 'info',
      'error': this.type == 'error',
      'phone': this.type == 'phone',
      'absl': this.isMessage == 2,
      'messageFadeInDown': this.visible,
      'messageFadeOutUp': !this.visible,
    }
  }

  mounted() {
    if (['success', 'warning', 'info', 'error', 'phone'].includes(this.type)) {
      this.startTimer()
    }
  }

  btnSave(type) {
    if (type == 'pop') {
      if (!this.popValue) {
        this.popValid = true;
      } else {
        this.close && this.close({ type, value: this.popValue });
        this.onClose(this.id);
        this.destroy();
      }
    } else {
      this.close && this.close(type);
      this.onClose(this.id);
      this.destroy();
    }
  }

  get messageStype() {
    let style: any = {}
    if (this.isMessage == 1) {
      if (this.placement == 'top') {
        style.top = `${this.offset}px`;
        style.left = "50%";
        style.transform = "translateX(-50%)"
      } else if (this.placement == 'middle') {
        style.top = "50%";
        style.left = "50%";
        style['transform'] = "translate(-50%,-50%)"
      }
    } else {
      style.top = `${this.offset}px`;
    }
    return {
      ...style,
      zIndex: this.zindex,
      'max-width': this.isPhone ? '75%' : '380px',
      'background-color': '',
      'transition': "opacity .3s,transform .4s,top .4s"
    }
  }

  startTimer() {
    if (this.time > 0) {
      this.timer = setTimeout(() => {
        if (this.visible) {
          this.visible = false;
        }
      }, this.time)
    }
  }

  clearTimer() {
    clearTimeout(this.timer)
    this.timer = null
  }

}
</script>

<style lang='less'>
._message {
  .success {
    background-color: #efffe5;
    border: 1px solid #e1f3d8;
    color: #67c23a;
    svg {
      fill: #67c23a;
    }
  }
  .warning {
    background-color: #fdf6ec;
    border: 1px solid #faecd8;
    color: #e6a23c;
    svg {
      fill: #e6a23c;
    }
  }
  .error {
    background-color: #fef0f0;
    border: 1px solid #fde2e2;
    color: #f56c6c;
    svg {
      fill: #f56c6c;
    }
  }
  .info {
    background-color: #edf2fc;
    border: 1px solid #ebeef5;
    color: #909399;
    svg {
      fill: #909399;
    }
  }
  .phone {
    background: rgba(0, 0, 0, 0.7);
    color: #fff;
  }

  // .anmessage-enter-active,
  // .anmessage-leave-active {
  //   // opacity: 1;
  //   transition: all 0.5s;
  // }
  // .anmessage-enter,
  // .anmessage-leave-to {
  //   opacity: 0;
  //   transform: translate(-50%, -100%);
  // }

  @keyframes messageFadeInDown {
    0% {
      -webkit-transform: translate3d(-50%, -100%, 0);
      transform: translate3d(-50%, -100%, 0);
    }
    100% {
      -webkit-transform: translate3d(-50%, 0, 0);
      transform: translate3d(-50%, 0, 0);
    }
  }
  .messageFadeInDown {
    -webkit-animation-duration: 0.2s;
    animation-duration: 0.2s;
    -webkit-animation-fill-mode: both;
    animation-fill-mode: both;
    -webkit-animation-name: messageFadeInDown;
    animation-name: messageFadeInDown;
  }
  @keyframes messageFadeOutUp {
    0% {
      opacity: 1;
    }
    100% {
      opacity: 0;
      -webkit-transform: translate3d(-50%, -100%, 0);
      transform: translate3d(-50%, -100%, 0);
    }
  }
  .messageFadeOutUp {
    -webkit-animation-duration: 0.6s;
    animation-duration: 0.6s;
    -webkit-animation-fill-mode: both;
    animation-fill-mode: both;
    -webkit-animation-name: messageFadeOutUp;
    animation-name: messageFadeOutUp;
  }
}
</style>