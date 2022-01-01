<template>
  <div v-if="isRel" :class="class" class="_upfile h-all">
    <div v-if="type=='slot'" class="w-all rel h-all">
      <input ref="input" @change="upfileImage(1)" title=" " :accept="accept" class="abs op-0 fs-0 zi-110 w-all hand at0 ab0 ar0 ab0" type="file">
      <div class="w-all rel zi-100 h-all">
        <slot></slot>
      </div>
    </div>
    <div :class="{'upfile-upload':!value}" v-if="type=='image'" class="tis-value wi-50 flex ai-c jc-c fd-c ra-5 hi-50 w-all rel h-all">
      <input ref="input" @change="upfileImage(1)" title=" " :accept="accept" class="abs op-0 fs-0 zi-140 w-all hand at0 ab0 ar0 ab0" type="file">
      <div v-if="!value" class="flex ai-c jc-c fd-c">
        <span v-if="!icon" class="fs-20">
          <svg t="1624601223915" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2400" width="20" height="20">
            <path
              d="M906.212134 565.732986 565.732986 565.732986 565.732986 906.212134C565.732986 926.013685 541.666486 959.972 511.97312 959.972 482.297674 959.972 458.213254 926.013685 458.213254 906.212134L458.213254 565.732986 117.734106 565.732986C97.950475 565.732986 63.97424 541.666486 63.97424 511.97312 63.97424 482.279754 97.950475 458.213254 117.734106 458.213254L458.213254 458.213254 458.213254 117.734106C458.213254 97.950475 482.297674 63.97424 511.97312 63.97424 541.666486 63.97424 565.732986 97.950475 565.732986 117.734106L565.732986 458.213254 906.212134 458.213254C925.995765 458.213254 959.972 482.279754 959.972 511.97312 959.972 541.666486 925.995765 565.732986 906.212134 565.732986Z"
              fill="#999" p-id="2401"></path>
          </svg>
        </span>
        <span :class="icon" v-else class="iconfont"></span>
        <span v-if="tip" class="fs-12 wrap centers fc-999 pl20 pr20">{{tip}}</span>
      </div>
      <div v-else :style="{'background-image':`url('${value}')`}" class="w-all   bs-c rel ra-5 h-all flex-1">
        <div class="w-all abs al0 boxs ra-5  h-all ba-3 ra-6 ai-c jc-c">
          <svg t="1624603187836" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="7147" width="16" height="16">
            <path
              d="M852.73794 471.165989c-23.186072 0-41.981137 18.797112-41.981137 41.983183l0 287.131533c0 40.504506-33.695427 73.458035-75.108628 73.458035L224.108662 873.738741c-41.414225 0-75.108628-32.95353-75.108628-73.458035L149.000034 287.035342c0-40.506553 33.695427-73.460082 75.108628-73.460082l289.329595 0c23.188118 0 41.983183-18.797112 41.983183-41.983183 0-23.188118-18.795065-41.983183-41.983183-41.983183l-289.329595 0c-87.714737 0-159.076018 70.622454-159.076018 157.427472l0 513.246387c0 86.802972 71.361281 157.425426 159.076018 157.425426L735.648175 957.708178c87.712691 0 159.073972-70.622454 159.073972-157.425426L894.722146 513.150196C894.722146 489.963101 875.927081 471.165989 852.73794 471.165989z"
              p-id="7148" fill="#ffffff"></path>
            <path
              d="M381.431757 598.260619c0 0-8.679683-8.366551-16.477276-6.368034-6.78145 1.293459-12.187577 22.10853-12.187577 22.10853l-40.34487 146.062634c0.3776 6.383384 5.894244 11.248182 12.319583 10.870582l128.994909-51.725058c0 0 30.255071-10.17064 30.867008-22.204721 0.899486-8.498558-20.304442-26.295899-20.304442-26.295899L381.431757 598.260619z"
              p-id="7149" fill="#ffffff"></path>
            <path
              d="M428.915211 556.198641l83.636862 74.507948c10.558473 9.407254 26.767644 8.500605 36.205597-2.02103l250.653737-279.483342c9.437953-10.522658 8.528234-26.675546-2.030239-36.083823l-83.634816-74.507948c-10.558473-9.403161-26.767644-8.500605-36.205597 2.023076L426.887019 520.116865C417.449066 530.640546 418.358785 546.795481 428.915211 556.198641z"
              p-id="7150" fill="#ffffff"></path>
            <path
              d="M757.44869 189.880605l83.636862 74.509994c10.558473 9.405207 26.767644 8.500605 36.205597-2.023076l14.049994-15.665795c9.437953-10.522658 8.528234-26.677593-2.030239-36.083823l-83.636862-74.509994c-10.556427-9.403161-26.765597-8.500605-36.20355 2.023076l-14.049994 15.667841C745.982544 164.322509 746.892263 180.477444 757.44869 189.880605z"
              p-id="7151" fill="#ffffff"></path>
          </svg>
          <span class="fs-13 ml2 fc-fff">修改</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import { Vue, Prop, Model } from 'vue-property-decorator';
export default class App extends Vue {
  @Prop({ type: String, default: 'image' }) type;
  @Prop({ type: [String, Number], default: 0 }) index;
  // 当一个页面多次使用时可用这个返回类型
  @Prop({ type: String, default: '' }) ftype;
  @Prop({ type: String, default: '' }) tip;
  @Prop({ type: String, default: '' }) icon;
  @Prop({ type: String, default: 'w-all' }) class;
  @Prop({ type: String, default: 'image/gif,image/jpeg,image/jpg,image/png,image/svg' }) accept;
  @Model('modelValue', { type: [String, Number, Boolean], default: "" }) value;
  @Prop({ type: Function }) upSuccess;
  isRel=true;
  upfileImage() {
    let input: any = this.$refs.input;
    let files = input.files;
    this.upSuccess(files[0], this.ftype, this.index)
    this.isRel=false;
    this.$nextTick(()=>{
      this.isRel=true;
    })
  }
}
</script>

<style lang='less'>
._upfile {
  .upfile-upload {
    border: 1px dashed #ddd;
    &:hover {
      border-color: #409eff;
    }
  }
  .tis-value {
    .boxs {
      display: none;
    }
    &:hover {
      .boxs {
        display: flex;
      }
    }
  }
}
</style>