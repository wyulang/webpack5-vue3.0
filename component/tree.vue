<template>
  <div class="w-all yu-tree">
    <div v-for="(item,index) in data" class="flex jc-c fd-c">
      <slot :node="{item,level:currLeval,parent:data}">
        <div @click="setNodeValue(item,index)" class="flex w-all ai-c">
          <span>></span>
          <span>{{item.label}}</span>
        </div>
      </slot>
      <div v-if="item.children&&item.children.length&&item.select" :class="left" ref="child">
        <tree v-slot="data" :level="currLeval" :left="left" :data="item.children">
          <slot :node="{...data.node}"></slot>
        </tree>
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import { Vue, Model, Prop, Options } from 'vue-property-decorator';
@Options({
  name: "tree"
})
export default class tree extends Vue {
  @Prop({ type: Object, default: [] }) data;
  @Prop({ type: Number, default: 0 }) level;
  @Prop({ type: String, default: "pl10" }) left;
  @Model('modelValue', { type: [Array, String, Number, Boolean, Object], default: [] }) value;
  setNodeValue(item, index) {
    this.$emit('update:modelValue', item);
  }

  get currLeval() {
    if (this.level == 0) {
      return 1;
    } else {
      return this.level + 1;
    }
  }
}
</script>

<style lang='less'>
.yu-tree{
  .tree-line{
    &:hover{
      background-color: #F0F6FF;
    }
  }
}
</style>