<template>
  <div :class="setItemClass(item)" @click="handSelect(item)" v-for="(item, index) in path" :key="index" class="flex hand flex-line ai-c">
    <svg t="1624104631224" class="icon" :style="{'fill':item.select?color[0]:color[1]}" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3126" :width="size" :height="size">
      <path v-if="item.select"
        d="M887.466667 1024h-750.933334c-75.093333 0-136.533333-61.44-136.533333-136.533333V136.533333c0-75.093333 61.44-136.533333 136.533333-136.533333h750.933334c75.093333 0 136.533333 61.44 136.533333 136.533333v750.933334c0 75.093333-63.146667 136.533333-136.533333 136.533333z m-134.826667-735.573333L433.493333 628.053333l-153.6-165.546666-71.68 76.8 225.28 242.346666 390.826667-414.72-71.68-78.506666z">
      </path>
      <path v-else
        d="M171.434667 85.333333A86.186667 86.186667 0 0 0 85.333333 171.434667V852.48A86.186667 86.186667 0 0 0 171.434667 938.666667H852.48A86.186667 86.186667 0 0 0 938.666667 852.565333V171.52A86.186667 86.186667 0 0 0 852.565333 85.333333H171.52z m0-85.333333H852.48C947.029333 0 1024 76.8 1024 171.434667V852.48A171.52 171.52 0 0 1 852.565333 1024H171.52A171.52 171.52 0 0 1 0 852.565333V171.52C0 76.970667 76.8 0 171.434667 0z">
      </path>
    </svg>
    <span class="ml6" v-if="item.label">{{item.label}}</span>
  </div>
</template>

<script lang='ts'>
import { Vue, Prop, Emit, Model } from 'vue-property-decorator';
import { isString, isArray, isObject } from '@lib/lang';
export default class checkbox extends Vue {
  // 数组[{ label: "是", value: "1" }, { label: "否", value: "2" }] 返回value=[1,2] 详情看get path
  // <checkboxs v-model="value" :data='[{ label: "是", value: "1" }, { label: "否", value: "2" }]'></checkboxs> value=[1,2]
  // <checkboxs v-model="value"></checkboxs>  value=true
  @Prop({ type: [Array, String, Boolean, Number], default: false }) data;
  @Prop({ type: [String, Boolean, Number], default: "" }) value;
  // 选中颜色
  @Prop({ type: [Array, String], default: ['#3699ff', '#888'] }) color;
  // 选中框大小
  @Prop({ type: [String, Number], default: 20 }) size;
  // 样式
  @Prop({ type: String, default: "" }) class;
  @Model('modelValue', { type: [Array, String, Number, Boolean], default: false }) mvalue;
  // label,value 显示值
  @Prop({ type: [Array, Object, String], default: ['label', 'value'] }) props;
  //禁用列表 禁用哪些值如:[1,2]
  @Prop({ type: Array }) exclude;

  setItemClass(item) {
    return {
      [this.class]: true,
      'fc-ccc allowed': item.disable
    }
  }

  get path() {
    let list: any = [];
    if (typeof this.value === "boolean") {
      list = [{ value: this.value, label: "", select: this.value }]
    } else {
      // 当data为数组
      if (isArray(this.data)) {
        let curr = this.mvalue || [];
        list = this.data.map(v => {
          if (typeof v == "string") {
            let disable = this.exclude && this.exclude.map(v => String(v)).includes(v) || false;
            return { value: v, label: v, select: curr.some(s => String(s) == String(v)), disable }
          } else {
            let disable = this.exclude && this.exclude.map(v => String(v)).includes(v[this.parm.value]) || false;
            return { value: v[this.parm.value], label: v[this.parm.label], select: curr.some(s => String(v[this.parm.value]) === String(s)), disable }
          }
        })
      } else {
        // 当data 为bool类型
        if (typeof this.data === "boolean") {
          list = [{ value: this.mvalue || false, label: "", select: this.mvalue }]
        } else {
          // 当data为 String Number 或为空时
          list = [{ value: this.data, label: "", select: String(this.mvalue) === String(this.data) }]
        }
      }
    }

    return list;
  }


  @Emit('change')
  handSelect(item) {
    if (item.disable) return;
    if (typeof this.value === "boolean") {
      return item.value;
    } else {
      let curr = [];
      let val: any = this.mvalue || [];
      if (isArray(this.data)) {
        if (val.some(v => String(v) === String(item.value))) {
          val = val.filter(v => String(v) !== String(item.value));
        } else {
          val.push(item.value);
        }
      } else {
        if (typeof this.data === "boolean") {
          val = !this.mvalue
        } else {
          if (String(this.mvalue)) {
            val = "";
          } else {
            val = item.value;
          }
        }
      }
      this.$emit('update:modelValue', val);
      return val;
    }
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
    label = label || 'label';
    value = value || 'value';
    return { label, value }
  }
}
</script>

<style lang='less'>
.allowed {
  svg {
    fill: #ccc !important;
  }
}
</style>