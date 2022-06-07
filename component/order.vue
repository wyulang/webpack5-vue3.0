<template>
  <div :class="class" class="flex-line hand ai-c" @click="btnOrder">
    <span>{{title}}</span>
    <svg v-if="visible" :class="size" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M755.370667 430.506667c0 8.192-2.986667 15.36-8.96 21.333333a29.354667 29.354667 0 0 1-21.333334 9.045333H298.922667a29.354667 29.354667 0 0 1-21.333334-8.96 29.184 29.184 0 0 1-9.045333-21.418666c0-8.192 2.986667-15.36 8.96-21.333334L490.666667 196.010667A29.184 29.184 0 0 1 512 187.136c8.192 0 15.36 2.986667 21.333333 8.96l213.077334 212.992c5.973333 5.973333 8.96 13.141333 8.96 21.333333z"
        :fill="lowfc"></path>
      <path
        d="M746.410667 591.616c5.973333 5.973333 8.96 13.226667 8.96 21.333333 0 8.277333-2.986667 15.445333-8.96 21.418667L533.333333 847.36a29.354667 29.354667 0 0 1-21.418666 9.045333 29.354667 29.354667 0 0 1-21.333334-9.045333L277.504 634.368a29.184 29.184 0 0 1-8.96-21.333333c0-8.192 2.986667-15.36 8.96-21.418667a29.184 29.184 0 0 1 21.333333-9.045333h426.069334c8.277333 0 15.36 2.986667 21.333333 9.045333z"
        :fill="upfc"></path>
    </svg>
  </div>
</template>

<script lang='ts'>
import { Vue, Model, Emit, Prop } from 'vue-property-decorator';
export default class App extends Vue {
  // 排序功能 排序asc|desc
  @Model('modelValue', { default: "" }) value: any;
  // 列标题名称
  @Prop({ type: String, default: "名称" }) title;
  //字段名称 如name,title..
  @Prop({ type: String, default: "" }) field;
  // 是否显示，父级需要控制显示时用到
  @Prop({ type: Boolean, default: false }) show;
  // 样式
  @Prop({ type: String, default: "" }) class;
  // 当前排序图标颜色
  @Prop({ type: String, default: "#000" }) fc;
  // 当前未排序图片颜色（底色）
  @Prop({ type: String, default: "#ccc" }) bc;
  // 图标大小
  @Prop({ type: String, default: "w-18 h-18" }) size;

  get visible() {
    return this.show && this.value
  }
  get lowfc() {
    if (this.value.toLocaleLowerCase() == 'asc') {
      return this.fc
    }
    return this.bc
  }
  get upfc() {
    if (this.value.toLocaleLowerCase() == 'asc') {
      return this.bc
    }
    return this.fc
  }


  @Emit('change')
  btnOrder() {
    let value = this.value.toLocaleLowerCase() == 'asc' ? 'desc' : 'asc';
    this.$emit('update:modelValue', value);
    return { title: this.title, value, field: this.field }
  }
}
</script>

<style lang='less'>
</style>