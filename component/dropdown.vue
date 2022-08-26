<template>
  <div ref="main" @click="onDown" @mouseover="onOver" :class="class" class="rel _dropdown flex-line">
    <slot></slot>
    <div v-if="visible" :style="offices" :class="mClass" class="abs bodys sha-6 ra-4">
      <scroll :maxHeight="maxHeight">
        <div ref="tip" @click.stop class="flex w-all fd-c">
          <slot name="body">
            <div :class="{'_is_select fb':currValue.value==item.value}" @click="selectItem(item)" v-for="(item,index) in path" class="hand h-34">
              <div :class="setStyle(item)" class="flex nowrap h-all w-all pl15 pr15 ai-c">{{item.label}}</div>
            </div>
          </slot>
        </div>
      </scroll>
    </div>
  </div>
</template>

<script lang='ts'>
import { Vue, Prop, Options, Model, Emit, Watch } from 'vue-property-decorator';
import scroll from './scroll.vue';
@Options({
  components: {
    scroll
  }
})
export default class App extends Vue {
  // 当出现在某个position: absolute元素内，出现滚动条时，需要当前的div  this.dom ==>id
  @Prop({ type: String, default: "" }) dom;
  // 间距
  @Prop({ type: [Number, String], default: 0 }) space;
  @Prop({ type: String, default: 'bottom' }) direction;
  @Prop({ type: String, default: '#333' }) fcolor;
  @Prop({ type: String, default: '#fff' }) bcolor;
  @Prop({ type: String, default: '220' }) maxHeight;
  //是否鼠标经过显示
  @Prop({ type: Boolean, default: false }) hover;

  @Prop({ type: String, default: "" }) class;
  @Prop({ type: String, default: "" }) mClass;
  // 数组 label,value 如name,id 或 {label:'name',value:'id'}
  @Prop({ type: [String, Object, Array], default: "" }) props;
  // 选中值
  @Model('modelValue', { type: [String, Number, Boolean], default: "" }) value;
  // 数据list
  @Prop({ type: Array, default: [] }) data!: any;
  // 禁止选项 [1,2,'name']
  @Prop({ type: Array }) disList;

  visible = false;

  position: any = { width: 0, height: 0, mainHeight: 0 }

  onDown() {
    if (this.hover) return;
    this.visible = !this.visible;
    if (this.visible) {
      document.addEventListener("click", this.setSelectPop);
    }
  }

  onOver() {
    if (!this.hover) return;
    this.visible = true;
    if (this.visible) {
      document.addEventListener("mousemove", this.setSelectPop);
    }
  }

  @Watch('visible')
  changeVisible() {
    this.$nextTick(() => {
      this.initDown();
    })
  }

  setSelectPop(e) {
    if (!this.$el.contains(e.target)) {
      this.visible = false;
      document.removeEventListener('click', this.setSelectPop)
      document.removeEventListener('mousemove', this.setSelectPop)
    }
  }

  beforeUnmount() {
    document.removeEventListener('click', this.setSelectPop);
  }

  get path() {
    return this.data.map(v => {
      let curr = {}
      if (typeof v !== 'object') {
        curr = { label: v, value: v }
      } else {
        curr = { ...v, label: v[this.parm.label], value: v[this.parm.value] }
      }
      return curr
    })
  }

  selectItem(item) {
    this.visible = false;
    this.$emit('update:modelValue', item[this.parm.value]);
    this.handSelect(item)
    document.removeEventListener('click', this.setSelectPop)
  }

  get currValue() {
    let item = this.path.find(v => { return v[this.parm.value] == this.value });
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

  @Emit('change')
  handSelect(item) {
    return { value: item[this.parm.value], item }
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

  get offices() {
    // 内容宽度
    let tipWidth = this.$refs.tip && this.$refs.tip.offsetWidth || 0;
    // 内容高度
    let tipHeight = this.$refs.tip && this.$refs.tip.offsetHeight || 0;
    tipHeight = tipHeight > 220 ? 220 : tipHeight;
    // 显示坐标top
    let top = this.$refs.main && this.$refs.main.getBoundingClientRect().top;
    // 显示坐标left
    let left = this.$refs.main && this.$refs.main.getBoundingClientRect().left;

    let position = {}

    let currHeight = tipHeight / 2 + this.position.height / 2;
    if (tipHeight < this.position.height) {
      currHeight = top;
    }

    switch (this.direction) {
      case "bottom":
        if ((tipWidth / 2) + left + (this.position.width / 2) > this.position.boyWidth) {
          position.left = this.position.boyWidth - left - tipWidth - 1 + 'px';
        } else {
          position = {
            'left': '50%',
            'transform': 'translateX(-50%)'
          }
        }
        if (tipHeight + top + this.position.height > this.position.boyHeight) {
          position.top = -tipHeight - parseInt(this.space) + 'px';
        } else {
          position.top = (this.position.height + parseInt(this.space)) + 'px'
        }
        break;
      case "top":
        if ((tipWidth / 2) + left + (this.position.width / 2) > this.position.boyWidth) {
          position.left = this.position.boyWidth - left - tipWidth - 1 + 'px';
        } else {
          position = {
            'left': '50%',
            'transform': 'translateX(-50%)'
          }
        }
        if (tipHeight > top) {
          position.top = (this.position.height + parseInt(this.space)) + 'px'
        } else {
          position.top = -(parseInt(this.space) + tipHeight) + 'px'
        }
        break;
      case "left":
        if (currHeight > top) {
          position.top = -top + 3 + 'px';
        } else if (currHeight + top > this.position.boyHeight) {
          position.top = 2 - this.position.boyHeight + 'px'
        } else {
          position = {
            'top': "50%",
            'transform': "translateY(-50%)"
          }
        }
        if (tipWidth > left) {
          position.left = this.position.width + parseInt(this.space) + 'px';
        } else {
          position.right = this.position.width + parseInt(this.space) + 'px';
        }
        break;
      case "right":
        if (currHeight > top) {
          position.top = -top + 3 + 'px';
        } else if (currHeight + top > this.position.boyHeight) {
          position.top = 2 - this.position.boyHeight + 'px'
        } else {
          position = {
            'top': "50%",
            'transform': "translateY(-50%)"
          }
        }
        if (tipWidth + left + this.position.width > this.position.boyWidth) {
          position.right = this.position.width + parseInt(this.space) + 'px';
        } else {
          position.left = this.position.width + parseInt(this.space) + 'px';
        }
        break;
    }
    return {
      'background-color': this.bcolor,
      'color': this.fcolor,
      'z-index': 2222,
      ...position
    }
  }

  initDown() {
    let mainHeight = this.$refs.main && this.$refs.main.offsetHeight;
    let mainWidth = this.$refs.main && this.$refs.main.offsetWidth;
    if (this.dom) {
      this.position = {
        boyWidth: document.getElementById(this.dom)?.scrollWidth,
        boyHeight: document.getElementById(this.dom)?.scrollHeight,
        height: mainHeight,
        width: mainWidth
      }
    } else {
      let height = document.body.scrollHeight;
      if (height <= document.documentElement.clientHeight) {
        height = document.documentElement.clientHeight;
      }
      let width = document.body.scrollWidth
      if (width <= document.documentElement.clientWidth) {
        width = document.documentElement.clientWidth
      }
      this.position = {
        boyWidth: width,
        boyHeight: height,
        height: mainHeight,
        width: mainWidth
      }
    }
  }
}
</script>

<style lang='less'>
.downHover {
  .bodys {
    display: none;
  }
  &:hover {
    .bodys {
      display: inline-flex !important;
    }
  }
}
._dropdown {
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