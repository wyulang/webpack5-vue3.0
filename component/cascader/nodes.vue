<template>
  <scrollbar :auto="scorllHeight" v-if="isFirst" :class="{'bl-e':level}" height="180">
    <section class="wi-120 pr3 h-all">
      <div :class="{'select-item':item[parm.value]==currValue,'is-check':check}" @click="setNodeValue(item,false,index)" v-for="(item,index) in list" :key="item.len+item[parm.value]" class="flex h-32 fs-13 pl10 pr10 cascader-item hand ai-c jc-b">
        <span class="cascader-titles pr5 nowrap">{{item.label}}</span>
        <div v-if="item.len&&(!isLoader||index!=currIndex)" class="flex w-16">
          <span class="cascader-arrow mt9"></span>
          <div @click="setNodeValue(item,true)" class="ra-3 hide b-8 checks w-16 h-16"></div>
        </div>
        <svg v-if="index==currIndex&&isLoader" style="fill:#999" class="w-16 loading h-16" viewBox="0 0 1024 1024">
          <path
            d="M964.388184 477.340047a72.848985 72.848985 0 0 1 22.16189 53.612757c0 20.991625-7.387297 38.691881-22.16189 53.612757a72.044428 72.044428 0 0 1-53.466474 22.16189c-20.845342 0-38.618739-7.460438-53.612757-22.16189a72.848985 72.848985 0 0 1-22.16189-53.612757c0-20.991625 7.387297-38.691881 22.16189-53.612757a72.848985 72.848985 0 0 1 53.612757-22.161889c20.7722 0 38.765022 7.460438 53.466474 22.161889m-99.911359 348.885199a73.141551 73.141551 0 0 1-22.527598 53.393332 72.995268 72.995268 0 0 1-53.393332 22.527598c-20.991625 0-38.618739-7.460438-53.612757-22.16189a72.848985 72.848985 0 0 1-22.16189-53.612757c0-20.991625 7.460438-38.618739 22.16189-53.612757a72.848985 72.848985 0 0 1 53.612757-22.16189c20.991625 0 38.691881 7.460438 53.612757 22.16189a72.410136 72.410136 0 0 1 22.308173 53.466474m56.904127-590.179175c0 36.717059-13.019196 68.094784-39.13073 93.913751a128.070856 128.070856 0 0 1-93.621185 38.691881c-36.643917 0-68.021642-12.946055-93.913752-38.691881a127.924573 127.924573 0 0 1-38.618739-93.913751c0-36.351351 12.946055-67.582793 38.618739-93.621186a127.924573 127.924573 0 0 1 93.986893-39.13073c36.351351 0 67.582793 13.092338 93.548044 39.203872 26.111534 25.818968 39.13073 57.05041 39.13073 93.548044m-374.192175 658.566525a72.848985 72.848985 0 0 1 22.088748 53.612757c0 20.991625-7.387297 38.691881-22.088748 53.612757a72.848985 72.848985 0 0 1-53.685899 22.16189c-20.991625 0-38.618739-7.460438-53.612757-22.16189a72.410136 72.410136 0 0 1-22.16189-53.612757c0-20.991625 7.460438-38.618739 22.16189-53.612757a72.848985 72.848985 0 0 1 53.612757-22.16189c20.991625 0 38.765022 7.460438 53.685899 22.16189M574.251151 33.151408c22.088748 22.16189 33.206264 48.931698 33.206264 80.675131 0 31.743433-11.117516 58.366958-33.206264 80.601989a109.566043 109.566043 0 0 1-80.60199 33.133123c-31.743433 0-58.366958-11.117516-80.601989-33.133123a109.346619 109.346619 0 0 1-33.206264-80.601989c0-31.743433 11.190657-58.366958 33.206264-80.675131A109.785468 109.785468 0 0 1 493.57602 0.018285c31.59715 0 58.366958 11.117516 80.601989 33.133123M252.208901 772.612489a72.848985 72.848985 0 0 1 22.088749 53.612757c0 20.991625-7.387297 38.691881-22.088749 53.685898a72.848985 72.848985 0 0 1-53.685898 22.088749 73.141551 73.141551 0 0 1-53.393332-22.527598 72.995268 72.995268 0 0 1-22.454457-53.393332c0-20.991625 7.387297-38.618739 22.088749-53.612757a72.848985 72.848985 0 0 1 53.685898-22.088748c20.991625 0 38.911305 7.387297 53.75904 22.235031M265.37438 168.975268c18.577954 18.577954 27.866931 40.959269 27.866931 66.92452 0 26.038392-9.288977 48.273424-27.866931 66.99766-18.577954 18.651096-40.959269 28.013214-66.99766 28.013214-25.965251 0-48.273424-9.215835-66.924519-27.940072a91.134373 91.134373 0 0 1-27.866931-66.924519c0-25.965251 9.215835-48.273424 27.866931-66.92452 18.724237-18.724237 40.959269-27.940072 66.924519-27.940072 26.038392 0 48.273424 9.215835 66.99766 27.793789M129.98937 477.340047a72.848985 72.848985 0 0 1 22.161889 53.612757c0 20.991625-7.460438 38.691881-22.161889 53.612757a72.190711 72.190711 0 0 1-53.612757 22.16189c-20.991625 0-38.691881-7.460438-53.612757-22.16189A72.190711 72.190711 0 0 1 0.601966 531.025946c0-20.991625 7.460438-38.691881 22.16189-53.612757a72.848985 72.848985 0 0 1 53.612757-22.16189c20.991625 0 38.765022 7.460438 53.612757 22.16189">
          </path>
        </svg>
      </div>
    </section>
  </scrollbar>
  <cascader-node @setPosition="setPosition" :check="check" :lazy="lazy" v-if="isNext" @onNodeSelect="onNodeSelect" v-model="value" :parm="parm" :level="level+1" :expan="expan" :data="data" :nodeValue="nodeValue"></cascader-node>
</template>

<script lang='ts'>
import { Vue, Options, Prop, Model, Emit } from 'vue-property-decorator';
import scrollbar from '../scroll.vue';
@Options({
  name: "cascader-node",
  components: {
    scrollbar
  }
})
export default class App extends Vue {
  @Prop({ type: Function }) lazy;
  @Prop({ type: Number, default: 0 }) level;
  @Prop({ type: Number, default: 0 }) expan;
  @Model('modelValue', { default: "" }) value: any;
  @Prop({ default: "" }) nodeValue: any;
  @Prop({ type: Object, default: {} }) parm;
  @Prop({ type: Array, default: [] }) data;
  @Prop({ type: Boolean, default: false }) check;

  isFirst = true;
  isRefresh = true;
  isNext = false;
  currValue = "";
  scorllHeight = 0;
  isLoader = false;
  currIndex = 0;


  @Emit('setPosition')
  setPosition(value) {
    return value
  }

  updated() {
    if (this.$el.parentNode && this.$el.parentNode.clientWidth) {
      this.setPosition(this.$el.parentNode.clientWidth)
    }
  }

  get list() {
    let curr = this.data[this.level];
    this.currValue = this.nodeValue[this.level];
    this.isNext = this.data[this.level + 1] && this.data[this.level + 1].list && this.data[this.level + 1].list.length;
    let data = curr && curr.list || [];

    if (this.expan == 1) {
      this.isFirst = false;
      this.$nextTick(() => {
        this.isFirst = true;
      })
    }

    let index = data.findIndex(v => v[this.parm.value] == this.currValue);
    index = index ? (index - 3) : 0;
    index = index < 0 ? 0 : index;
    this.scorllHeight = index * 32;

    let path = data.map(v => {
      let len = v[this.parm.child] && v[this.parm.child].length || 0;
      return {
        value: v[this.parm.value], label: v[this.parm.label], children: v[this.parm.child] || [], len, ...v
      }
    })

    if (data.length) {
      return path;
    } else {
      return []
    }
  }

  @Emit('onNodeSelect')
  onNodeSelect(value) {
    return value
  }

  onRefresh() {
    this.isRefresh = false;
    this.$nextTick(() => {
      this.isRefresh = true;
    })
  }

  setNodeValue(data, check = false, index) {
    let curr = JSON.parse(JSON.stringify(data));
    if (this.lazy && !check) {
      if (data.children && data.children.length == 0) {
        this.isLoader = true;
        this.lazy(data).then(res => {
          this.isLoader = false;
          if (res && res.length) {
            curr.children = res;
            curr.len = res.length;
            let isNode = !curr.len;
            this.onNodeSelect({ ...curr, level: this.level, isNode, lazy: true })
          } else {
            let isNode = true;
            this.onNodeSelect({ ...curr, level: this.level, isNode })
          }
        })
      } else {
        let isNode = !data.len;
        this.onNodeSelect({ ...curr, level: this.level, isNode })
      }
    } else {
      let isNode = !data.len || check;
      this.onNodeSelect({ ...curr, level: this.level, isNode })
    }
  }

}
</script>

<style lang='less'>
.loading {
  animation: myfirst2 1.5s infinite linear;
}
@keyframes myfirst2 {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(359deg);
  }
}
</style>