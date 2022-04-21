<template>
  <section class="w-all">
    <!-- {{value}}{{childValue}} -->
    <section class="w-all" v-for="(item,index) in path" :key="index">
      <div @click="btnNode(index)" :style="{'padding-left':`${level*25}px`}" :class="[lineClass]" class="w-all tree-item flex ai-c">
        <!-- 三角型 -->
        <div class="w-18 h-18">
          <svg style="fill:#ddd" v-if="item.children.length" :class="{'isOpen':item.open}" class="w-18 hand arrow h-18" viewBox="0 0 1024 1024">
            <path
              d="M446.293333 768a95.146667 95.146667 0 0 1-38.826666-8.533333 75.093333 75.093333 0 0 1-44.8-67.84V332.373333A75.093333 75.093333 0 0 1 407.466667 264.533333a89.6 89.6 0 0 1 94.293333 11.093334l217.6 179.626666a72.533333 72.533333 0 0 1 0 113.493334l-217.6 179.626666a87.893333 87.893333 0 0 1-55.466667 19.626667z">
            </path>
          </svg>
        </div>
        <!-- checkbox -->
        <svg v-if="check" @click.stop="selectNode(index)" viewBox="0 0 1024 1024" class="w-22 ra-3 hidden hand mr5 h-22">
          <path v-if="item.check===1" style="fill:#409eff"
            d="M170.666667 128h682.666666a42.666667 42.666667 0 0 1 42.666667 42.666667v682.666666a42.666667 42.666667 0 0 1-42.666667 42.666667H170.666667a42.666667 42.666667 0 0 1-42.666667-42.666667V170.666667a42.666667 42.666667 0 0 1 42.666667-42.666667z m128 341.333333v85.333334h426.666666v-85.333334H298.666667z">
          </path>
          <path v-else-if="item.check===2" style="fill:#409eff"
            d="M170.666667 128h682.666666a42.666667 42.666667 0 0 1 42.666667 42.666667v682.666666a42.666667 42.666667 0 0 1-42.666667 42.666667H170.666667a42.666667 42.666667 0 0 1-42.666667-42.666667V170.666667a42.666667 42.666667 0 0 1 42.666667-42.666667z m298.794666 554.666667l301.653334-301.696-60.330667-60.330667-241.322667 241.365333-120.704-120.704-60.330666 60.330667L469.461333 682.666667z">
          </path>
          <path v-else style="fill:#ddd"
            d="M802.133333 911.68h-576a117.461333 117.461333 0 0 1-117.333333-117.333333v-576c0-64.704 52.629333-117.333333 117.333333-117.333334h576c64.704 0 117.333333 52.629333 117.333334 117.333334v576c0 64.704-52.629333 117.333333-117.333334 117.333333z m-576-746.666667a53.397333 53.397333 0 0 0-53.333333 53.333334v576c0 29.397333 23.936 53.333333 53.333333 53.333333h576c29.397333 0 53.333333-23.936 53.333334-53.333333v-576c0-29.397333-23.936-53.333333-53.333334-53.333334h-576z">
          </path>
        </svg>
        <!-- 标题 -->
        <slot :node="{item,level:level,parent:data}">
          <span class="fs-14">{{item.label}}</span>
        </slot>
      </div>
      <!-- children -->
      <div v-if="item.children.length&&item.open" class="w-all">
        <tree @nodeSelect="nodeSelect" @changeFirst="changeFirst" :isFoot="item.children.length" :data="item.children" :only="only" :expand="expand" :lineClass="lineClass" v-model="value" :props="props" :parent="item" :level="level+1">
          <slot :node="{...data.node}"></slot>
        </tree>
      </div>
    </section>
  </section>

</template>

<script lang='ts'>
// <tree props="label,id" line-class="pt2 pb2" only expand v-model="value" :data="data"></tree>
import { Vue, Prop, Model, Options, Emit } from 'vue-property-decorator';
import { isString, isArray, isObject } from '@lib/lang';
@Options({
  name: "tree"
})
export default class App extends Vue {
  @Prop({ type: String, default: "" }) lineClass;
  @Prop({ type: Number, default: 0 }) level;
  // 
  @Prop({ type: Boolean, default: false }) only;
  @Prop({ type: Number, default: 0 }) isFoot;
  @Prop({ type: Boolean, default: false }) expand;
  @Prop({ type: Array, default: [] }) data;
  @Prop({ type: Object, }) parent;
  @Prop({ type: Boolean, default: true }) check;
  // 配置选项
  @Prop({ type: [Array, Object, String], default: ['label', 'value'] }) props;
  @Model('modelValue', { type: [String, Number, Boolean, Array], default: "" }) value;

  childValue = [];
  isFirst = true;


  get path() {
    if (!this.level) {
      if (!String(this.value) && !String(this.childValue)) {
        this.setInit();
      } else if (String(this.value) != String(this.childValue)) {
        this.setNode(this.data);
        this.childValue = JSON.parse(JSON.stringify(this.value));
      }
    }
    return this.data.map(v => {
      let open = v.open;
      if (open == undefined) {
        open = this.expand;
      }
      let check = v.check || 0;
      return {
        label: v[this.parm.label],
        value: v[this.parm.value],
        children: v[this.parm.child] || [],
        level: this.level,
        open: open,
        check: check
      }
    })
  }

  getNode(list, val) {
    if (list && list.length) {
      list.forEach(item => {
        if (item.check == 2) {
          val.push(item[this.parm.value])
        }
        if (item[this.parm.child] && item[this.parm.child].length) {
          this.getNode(item[this.parm.child], val);
        } else {
          item.isfoot = 1
        }
      })
    }
  }

  setInit() {
    this.data.forEach(item => {
      item.check = 0;
      if (item[this.parm.child] && item[this.parm.child].length) {
        this.setNode(item[this.parm.child]);
      } else {
        item.isfoot = 1
      }
    });
  }

  setNode(list) {
    list && list.length && list.forEach(item => {
      if (this.value.map(v => String(v)).includes(String(item[this.parm.value]))) {
        item.check = 2
      } else {
        item.check = 0;
      }
      let childLen = item[this.parm.child].length;
      if (item[this.parm.child] && childLen) {
        if (!this.only) {
          let nex = item[this.parm.child].filter(v => this.value.map(s => String(s)).includes(String(v[this.parm.value])))
          if (nex.length && nex.length < childLen) {
            item.check = 1;
          } else if (nex.length && nex.length == childLen) {
            item.check = 2
          }
        }
        this.setNode(item[this.parm.child]);
      } else {
        item.isfoot = 1
      }
    })
  }

  selectChild(list, item) {
    list && list.length && list.forEach(v => {
      v.check = item.check == 2 ? 2 : 0;
      if (v.children && v.children.length) {
        this.selectChild(v.children, item)
      }
    })
  }

  selectNode(index) {
    this.changeFirst(false)
    let item = this.data[index];
    item.check = item.check == 2 ? 0 : 2;
    if (!this.only) {
      this.selectChild(item.children, item)
    }
    this.nodeSelect({ low: 1 })
  }

  btnNode(index) {
    if (this.data[index].open == undefined && this.expand) {
      this.data[index].open = false;
    } else {
      this.data[index].open = !this.data[index].open;
    }
  }

  @Emit('changeFirst')
  changeFirst(v) {
    this.isFirst = v;
  }

  @Emit('nodeSelect')
  nodeSelect(data) {
    if (!data.low&&!this.only) {
      this.data.find(item => item[this.parm.value] == data.value).check = data.check
    }
    let currSelect = this.data.filter(v => v.check == 2).length;
    let currhalf = this.data.filter(v => v.check == 1).length;
    let check = 0;
    if (!this.only) {
      if (this.data.length == currSelect) {
        check = 2;
      } else if (currSelect > 0 && currSelect < this.data.length) {
        check = 1
      } else if (!currSelect && currhalf > 0) {
        check = 1;
      }
    } else {
      if (this.data.length == currSelect) {
        check = 2;
      } else {
        check = 0
      }
    }

    if (!this.level) {
      this.childValue = [];
      this.getNode(this.data, this.childValue);
      this.$emit('update:modelValue', this.childValue);
    }
    if (this.only) {
      return { check, value: false }
    }
    return { check, value: this.parent && this.parent.value }
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
}
</script>

<style lang='less'>
.arrow {
  transform: rotate(0deg);
  transition: transform 0.1s ease-in-out;
  &.isOpen {
    transform: rotate(90deg);
  }
}
.tree-item {
  &:hover {
    background-color: #f7f7f7;
  }
}
</style>