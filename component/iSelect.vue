<template>
  <div @click="btnSelect" :class="class" class="flex ai-c jc-b flex-1">
    <span v-if="value">{{currValue.label}}</span>
    <span class="fc-ccc" v-else>{{placeholder}}</span>
    <span v-if="icon" :class="icon" class="iconfont"></span>
    <div v-else class="arrow-right w-18 h-18 mr4"></div>
  </div>

  <section v-if="visible" class="hv-all fixed at0 al0 flex fd-c ab0 ar0 w-all ba-4">
    <div @click="btnClose" class="flex-1"></div>
    <div class="flex bc-fff pl4 fs-28 pr4 bb-e ai-c h-90">
      <span @click="btnClose" class="pp20">取消</span>
      <div class="flex-1"></div>
      <span @click="btnClear" class="pp20">清空</span>
    </div>
    <div ref="selectBody" class="h-600 pl24 pr24 auto bc-fff">
      <div :class="{'_is_select fb':currValue.value==item.value,'is_dis':(item.disabled&&currValue.value!=item.value)}" @click="btnSave(item)" style="border-bottom:1px solid #f8f8f8" v-for="item in path" class="flex pt34 pb34">
        <slot :item="item">
          <span class="fs-30">{{item.label}}</span>
        </slot>
        <!-- 使用方法
        <template v-slot="item">
          <span class="fs-30">{{item.item.address}}</span>
        </template>
         -->
      </div>
    </div>
  </section>
</template>



<script lang='ts'>
import { isString, isArray, isObject } from '@lib/lang';
import { Vue, Prop, Model, Emit } from 'vue-property-decorator';
export default class App extends Vue {
  @Prop({ type: String, default: "flex-1" }) class;
  // 图标
  @Prop({ type: String, default: "" }) icon;
  // 懒加载 return [] 输入查询 远程搜索
  @Prop({ type: Function }) lazy;
  @Model('modelValue', { type: [String, Number, Boolean], default: "" }) value;
  @Prop({ type: String, default: "" }) placeholder;
  // 取值 props="name,id" 对应的是 label,value
  @Prop({ type: [String, Object, Array], default: "" }) props;
  // 禁用
  @Prop({ type: Boolean, default: false }) disabled;
  // list [{label:'',value}] -- [1,2]=>[{labe:1,value:1},{label:2,value:2}]
  @Prop({ type: Array, default: [] }) data!: any;
  // 当一个页面使多次使用时，可根据类型分别给值
  @Prop({ type: [String, Number, Boolean], default: "1" }) type;
  //禁用列表 禁用哪些值如:[1,2]
  @Prop({ type: Array }) exclude;

  currIndex = 0;
  isFirst = true;
  scrollTop = 0;

  visible = false;

  get currValue() {
    let item = this.path.find((v, i) => { return String(v.value) === String(this.value) });
    if (item) {
      return item
    } else {
      return { label: "", value: "" }
    }
  }

  btnClear() {
    this.$emit('update:modelValue', "");
    this.visible = false;
  }

  @Emit('change')
  handSelect(item) {
    return { value: item.value, item, type: this.type }
  }

  btnSave(item) {
    let curr = item.value;
    if (this.exclude && curr != String(this.value)) {
      if (this.exclude.some(v => String(item.value) == String(v))) {
        return;
      }
    }
    this.visible = false;
    this.isFirst = false;
    this.scrollTop = this.$refs.selectBody.scrollTop;
    this.$emit('update:modelValue', item.value);
    setTimeout(() => {
      this.handSelect(item)
    }, 50);
  }

  get path() {
    return this.data.map((v, index) => {
      let curr = {}
      if (typeof v !== 'object') {
        if (String(v) == String(this.value)) {
          this.currIndex = index;
        }
        curr = { label: v, value: v }
      } else {
        if (String(v[this.parm.value]) == String(this.value)) {
          this.currIndex = index;
        }
        curr = { ...v, label: v[this.parm.label], value: v[this.parm.value] }
      }
      return curr
    })
  }

  get parm() {
    let label = "label";
    let value = "value";
    let child = "children";
    if (this.props) {
      if (isString(this.props)) {
        let obj = this.props.split(',');
        if (obj[0]) {
          label = obj[0];
        }
        if (obj[1]) {
          value = obj[1]
        }
        if (obj[2]) {
          child = obj[2]
        }
      } else if (isArray(this.props)) {
        if (this.props[0]) {
          label = this.props[0];
        }
        if (this.props[1]) {
          value = this.props[1]
        }
        if (this.props[2]) {
          child = this.props[2]
        }
      } else if (isObject(this.props)) {
        label = this.props.label;
        value = this.props.value;
        child = this.props.children;
      }
    }
    return { label, value, child }
  }

  btnClose() {
    this.visible = false;
  }

  btnSelect() {
    this.visible = true;
    this.$nextTick(() => {
      if (this.isFirst && this.currIndex > 6) {
        this.$refs.selectBody.scrollTop = Number(this.currIndex + 1) * 36;
      } else {
        this.$refs.selectBody.scrollTop = this.scrollTop
      }
    })
  }
}
</script>

<style lang='less'>
.arrow-right {
  border-width: 1.5px 1.5px 0 0;
  border-color: #ddd;
  border-style: solid;
  transform: rotate(45deg);
}
.is_dis {
  color: #c0c4cc;
  cursor: not-allowed;
}
._is_select {
  color: #409eff;
}
</style>