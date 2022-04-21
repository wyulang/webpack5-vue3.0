<template>
  <div :style="currStyle" :class="currClass" class="flex-line ai-c fc-fff h-20 rel fs-12 ra-16 _switch hand rel" @click="btnSet">
    <span class="nowrap" style="min-width: 10px;">{{show&&path.label ||''}}</span>
    <svg class="w-16 abs abst h-16" fill="#fff" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg">
      <path d="M0 512C0 229.230208 229.805588 0 512 0 794.769792 0 1024 229.805588 1024 512 1024 794.769792 794.194412 1024 512 1024 229.230208 1024 0 794.194412 0 512Z"></path>
    </svg>
  </div>
</template>

<script lang='ts'>
import { Vue, Prop, Model, Emit } from 'vue-property-decorator';
import { isString, isArray, isObject } from '../../lib/lang';
export default class App extends Vue {
  @Model('modelValue', { type: [String, Number, Boolean], default: "" }) value;
  @Prop({ type: [Array, String, Object], default: { value: true, label: "是" } }) open;
  @Prop({ type: [Array, String, Object], default: { value: false, label: "否" } }) close;
  @Prop({ type: Boolean, default: false }) show;
  @Prop({ type: String, default: "md" }) size;
  @Prop({ type: Boolean, default: false }) disabled;
  @Prop({ type: [String, Number, Object, Array] }) data;

  btnSet() {
    if (!this.disabled) {
      if (String(this.value) === String(this.path.open.value)) {
        this.$emit('update:modelValue', this.path.close.value);
        this.handSelect(this.path.close.value);
      } else {
        this.$emit('update:modelValue', this.path.open.value);
        this.handSelect(this.path.open.value);
      }
    }
  }

  @Emit('change')
  handSelect(value) {
    return { value, data: this.data }
  }

  get path() {
    let open: any;
    let close: any;
    if (this.open) {
      if (isString(this.open)) {
        let obj = this.open.split(',');
        open = { value: obj[1] || true, label: obj[0] || "是", color: obj[2] || '#409eff' }
      } else if (isArray(this.open)) {
        open = { value: this.open[1] || true, label: this.open[0] || "是", color: this.open[2] || '#409eff' }
      } else if (isObject(this.open)) {
        open = { value: this.open.value || true, label: this.open.label || "是", color: this.open.color || '#409eff' }
      }
    }
    if (this.close) {
      if (isString(this.close)) {
        let obj = this.close.split(',');
        close = { value: obj[1] || false, label: obj[0] || "否", color: obj[2] || '#d5d5d5' }
      } else if (isArray(this.close)) {
        close = { value: this.close[1] || false, label: this.close[0] || "否", color: this.close[2] || '#d5d5d5' }
      } else if (isObject(this.close)) {
        close = { value: this.close.value || false, label: this.close.label || "否", color: this.close.color || '#d5d5d5' }
      }
    }

    let label;
    if (String(this.value) == String(open.value)) {
      label = open.label;
    } else {
      label = close.label;
    }
    return { open, close, label }
  }

  get currClass() {
    if (String(this.value) == String(this.path.open.value)) {
      return "switch-true pr22 pl5"
    } else {
      return "switch-false pl22 pr5"
    }
  }

  get currStyle() {
    if (String(this.value) == String(this.path.open.value)) {
      return `background-color:${this.path.open.color};`
    } else {
      return `background-color:${this.path.close.color};`
    }
  }
}
</script>

<style lang='less'>
._switch {
  transition: all 0.21s ease;
  svg {
    transition: all 0.21s ease;
  }
}
.switch-true {
  svg {
    right: 3px;
  }
}
.switch-false {
  svg {
    right: 100%;
    margin-right: -19px;
  }
}
</style>