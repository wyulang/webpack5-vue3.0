<template>
  <div class="flex-line">
    <div @click="handSelect(item)" v-for="(item, index) in path" :key="index" class="flex-line hand ai-c mr10">
      <svg t="1610071219114" class="icon" :style="{'fill':color[setColor(item)]}" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="13328" width="20" height="20">
        <path v-if="!setColor(item)"
          d="M512 938.666667C276.352 938.666667 85.333333 747.648 85.333333 512S276.352 85.333333 512 85.333333s426.666667 191.018667 426.666667 426.666667-191.018667 426.666667-426.666667 426.666667z m0-85.333334a341.333333 341.333333 0 1 0 0-682.666666 341.333333 341.333333 0 0 0 0 682.666666z m0-128a213.333333 213.333333 0 1 1 0-426.666666 213.333333 213.333333 0 0 1 0 426.666666z">
        </path>
        <path v-else d="M512 938.666667a426.666667 426.666667 0 1 1 426.666667-426.666667 426.666667 426.666667 0 0 1-426.666667 426.666667z m0-768a341.333333 341.333333 0 1 0 341.333333 341.333333 341.333333 341.333333 0 0 0-341.333333-341.333333z" p-id="13458"></path>
      </svg>
      <span :style="{'color':color[setColor(item)]}" class="ml5">{{item.label}}</span>
    </div>
  </div>
</template>

<script lang='ts'>
import { Vue, Prop, Model, Emit } from 'vue-property-decorator';
export default class App extends Vue {
  @Prop({ type: Array, default: [] }) data;
  @Prop({ type: [Array, String], default: ['#3699ff', '#888'] }) color;
  @Prop({ type: [Array, String], default: [] }) icon;
  @Model('modelValue', { type: [String, Number, Boolean], default: "" }) value;

  @Emit('change')
  handSelect(item) {
    this.$emit('update:modelValue', item.value);
    return item.value
  }

  get path() {
    let list = [];
    list = this.data.map(v => {
      let opt = v;
      if (typeof v == "string") {
        opt = { label: v, value: v };
      }
      return opt
    })
    return list;
  }

  private setColor(item) {
    let v = String(this.value);
    let inv = String(item.value);
    if (v == inv) {
      return 0
    } else {
      return 1;
    }
  }
}
</script>

<style lang='less'>
</style>