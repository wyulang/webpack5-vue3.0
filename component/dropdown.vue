<template>
  <div :class="class" class="flex-line ai-c pt2 _dropdown fd-c">
    <div @click="upSelect" class="flex-line ai-c">
      <slot></slot>
    </div>
    <div style="height:0;" @click.stop v-if="visible&&data.length" class=" zi-8888 rel">
      <div class="drop-top abs at-8 absl"></div>
      <div class="_selects_dropdown abs absl at8 sha-6 bc-fff ra-4 fc-333 al0 pt5 pb5">
        <scrollbar ref="selectBox" maxHeight="220">
          <div class="flex w-all fd-c">
            <div :class="{'_is_select fb':currValue[parm.value]==item[parm.value]}" @click="selectItem(item)" v-for="(item,index) in data" class="hand h-34">
              <div :class="setStyle(item)" class="flex nowrap h-all w-all pl15 pr15 ai-c">{{item[parm.label]}}</div>
            </div>
          </div>
        </scrollbar>
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import { Vue, Prop, Model, Emit, Options } from 'vue-property-decorator';
import { isString, isArray, isObject } from '../../lib/lang';
import scrollbar from './scroll.vue';
@Options({
  components: {
    scrollbar
  }
})
export default class App extends Vue {
  @Prop({ default: '标题', type: String }) title;
  @Prop({ type: String, default: "" }) class;
  @Prop({ type: [String, Object, Array], default: "" }) props;
  @Model('modelValue', { type: [String, Number, Boolean], default: "" }) value;
  @Prop({ type: Array, default: [] }) data!: any;
  @Prop({ type: Array }) disList;
  visible = false;
  upSelect() {
    if (this.visible) {
      this.visible = false;
    } else {
      this.visible = !this.visible;
    }
    document.addEventListener("click", this.setSelectPop);
  }

  selectItem(item) {
    this.visible = false;
    this.$emit('update:modelValue', item[this.parm.value]);
    this.handSelect(item)
    document.removeEventListener('click', this.setSelectPop)
  }

  setStyle(item) {
    let curr = item[this.parm.value];
    if (this.disList && curr != String(this.value)) {
      if (this.disList.some(v => String(item[this.parm.value]) == String(v))) {
        return "is_dis"
      } else {
        return "_select_hover"
      }
    } else {
      return "_select_hover"
    }
  }

  @Emit('change')
  handSelect(item) {
    return { value: item[this.parm.value], item }
  }

  setSelectPop(e) {
    if (!this.$el.contains(e.target)) {
      this.visible = false;
      document.removeEventListener('click', this.setSelectPop)
    }
  }

  get currValue() {
    let item = this.data.find(v => { return v[this.parm.value] == this.value });
    if (item) {
      return item
    } else {
      return { [this.parm.label]: "", [this.parm.value]: "" }
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
      }
    }
    return { label, value }
  }


}
</script>

<style lang='less'>
._dropdown {
  .drop-top {
    width: 0;
    height: 0;
    border-width: 10px;
    border-style: solid;
    border-color: transparent transparent #ffffff transparent;
  }
  .is-select {
    border-color: #57a3f3;
  }
  ._select_hover {
    &:hover {
      background-color: #f5f7fa;
      color: #409eff;
    }
  }
  .is_dis {
    color: #c0c4cc;
    cursor: not-allowed;
  }
  ._is_select {
    color: #409eff;
  }
  ._selects_dropdown {
    box-sizing: border-box;
    border-radius: 4px;
    box-shadow: 0 1px 6px rgba(0, 0, 0, 0.2);
  }
}
</style>